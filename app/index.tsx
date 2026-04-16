import { ScreenContent } from 'Components/Page/ScreenContent';
import { Image, Switch, View, useColorScheme, ScrollView } from 'react-native';
import { loginSchema } from 'Schemas/validationSchemas';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from 'Components/UI/FormFields/TextField';
import { PasswordField } from 'Components/UI/FormFields/PasswordField';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useValidateLogin } from 'Hooks/useValidateLogin';
import { Button } from 'Components/UI/Button';
import { TextApp } from 'Components/UI/Text';

type LoginData = yup.InferType<typeof loginSchema>;

export default function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: 'admin', password: 'password' },
  });
  const { validateLogin, loading } = useValidateLogin();
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (formData: LoginData) => {
    const isValid = await validateLogin(formData.username, formData.password);
    if (isValid) {
      router.navigate('/home');
    } else {
      setErrorMessage('Usuário ou senha inválidos. Tente novamente.');
    }
  };

  const colorScheme = useColorScheme();
  const imageSource = colorScheme === 'dark' ? require('../Assets/bayoo-dark.png') : require('../Assets/bayoo-light.png');
  return (
    <ScreenContent title="Login" path="App.tsx">
      <View className='gap-4 flex items-center w-full'>
        <TextApp className='text-3xl font-bold'>Bem-vindo de volta!</TextApp>
        <TextApp className='text-gray-600 dark:text-gray-400'>Faça login para continuar</TextApp>
      </View>
      <ScrollView className='gap-4 flex items-center w-full'>
        <Image source={imageSource} className='w-48 h-48 mb-4' />
        
        <View>
          <TextApp className='font-bold '>Username: </TextApp>
          <TextField<LoginData> control={control} name="username" placeholder="Write your username" />
        </View>

        <View>
          <TextApp className='font-bold'>Password:</TextApp>
          <PasswordField<LoginData> control={control} name="password" placeholder="Write your password" />
        </View>

        { errorMessage && (<TextApp className='text-red-500'>{errorMessage}</TextApp>) }

        <View className='w-full'>
          <Button className='w-full' onPress={handleSubmit(onSubmit)} variant="default" disabled={loading}>
            <TextApp className='text-white font-bold'>
              {loading ? 'Login...' : 'Login'}
            </TextApp>
          </Button>
        </View>

        <View className='flex flex-row gap-1 items-center'>
          <Switch
            trackColor={{ false: "#767577", true: "#0ea5e9" }}
            thumbColor={isConnected ? "#ffffff" : "#ffffff"}
            value={isConnected}
            onValueChange={setIsConnected}
          />
          <TextApp>Stay connected</TextApp>
        </View>

        <View>
          <TextApp>Forgot username or password? </TextApp>
        </View>
      </ScrollView>
    </ScreenContent>
  );
}
