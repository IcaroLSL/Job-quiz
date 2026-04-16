import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { Pressable, Text, TextInput, View, useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
type PasswordFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    placeholder: string;
};

export function PasswordField<T extends FieldValues>({ control, name, placeholder, }: PasswordFieldProps<T>) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const colorScheme = useColorScheme();
    const placeholderColor = colorScheme === 'dark' ? '#ffffff' : '#cccccc';

    return (

        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value }, fieldState: { error } }) => (

                    <View className='gap-2  w-full' >
                        <View className='items-center w-full'>
                            <TextInput
                                className={`border  py-4 px-4 min-w-full max-w-full  rounded-md  text-black dark:text-white ${error ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder={placeholder}
                                placeholderTextColor={placeholderColor}
                                secureTextEntry={!isPasswordVisible}
                                onChangeText={onChange}
                                value={value}
                            />
                            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute right-4 top-1/2 -translate-y-1/2">
                                <MaterialIcons name={isPasswordVisible ? "visibility" : "visibility-off"} size={24} color="gray" />
                            </Pressable>
                        </View>

                        {error && <Text className='text-red-500'>{error.message}</Text>}

                    </View>

                )}
            />
        </>
    );
}