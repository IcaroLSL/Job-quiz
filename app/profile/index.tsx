import { View, Switch } from 'react-native'
import { ScreenContent } from 'Components/Page/ScreenContent';
import { TextApp } from 'Components/UI/Text';
import { EmptyLine } from 'Components/UI/EmptyLine';
import { useToggleTheme } from 'Hooks/useToggleTheme';


export default function index() {
    const { isDark, setDarkTheme, setLightTheme } = useToggleTheme();
    return (
        <ScreenContent title='Profile' path="profile/index">
            <TextApp className='font-bold text-5xl' >Profile Screen</TextApp>
            <EmptyLine size='small' />
            <View className='flex flex-row gap-1 items-center'>
                <TextApp className='font-bold text-lg' >Select dark theme</TextApp>
                <Switch
                    trackColor={{ false: "#767577", true: "#0ea5e9" }}
                    thumbColor={isDark ? "#ffffff" : "#ffffff"}
                    value={isDark}
                                        onValueChange={(value) => {
                                            if (value) {
                                                void setDarkTheme();
                                                return;
                                            }
                                            void setLightTheme();
                                        }}
                />
            </View>
        </ScreenContent>
    )
}
