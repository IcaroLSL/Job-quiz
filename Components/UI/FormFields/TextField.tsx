import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { Text, TextInput, View, useColorScheme } from 'react-native';

type TextFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    placeholder: string;
};

export function TextField<T extends FieldValues>({
    control,
    name,
    placeholder,
}: TextFieldProps<T>) {
    const colorScheme = useColorScheme();
    const placeholderColor = colorScheme === 'dark' ? '#ffffff' : '#cccccc';

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value }, fieldState: {error} }) => (

                    <View className='gap-2 w-full'>
                        <TextInput
                            className={`border min-w-full max-w-full py-4 px-4 rounded-md text-black dark:text-white ${error ? 'border-red-500' : ' border-gray-300'}`}
                            placeholder={placeholder}
                            placeholderTextColor={placeholderColor}
                            onChangeText={onChange}
                            value={value}
                        />

                        {error && <Text className='text-red-500'>{error.message}</Text>}
                    </View>
                )}
            />
        </>
    );
}