import { Button } from 'Components/UI/Button';
import ModalComponent from 'Components/UI/Modal';
import SlideModalComponent from 'Components/UI/SideModal';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, Pressable, TouchableOpacity } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path } from "react-native-svg";
import { useToggleTheme } from 'Hooks/useToggleTheme';

interface ScreenContentProps {
  title: string;
  path: string;
  children?: React.ReactNode;
}

export const ScreenContent: React.FC<ScreenContentProps> = ({ title, path, children }) => {
  const { isDark, setDarkTheme, setLightTheme } = useToggleTheme();

  const router = useRouter();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  
  const handleLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView className='h-[100%] w-[100%] bg-white dark:bg-gray-900'>
        {path !== "App.tsx" && path !== "home.tsx" && path !== "settings/index.tsx" && (
          <View className='w-full bg-primary-800 flex flex-row justify-between p-2 items-center '>
            <Text className="text-3xl text-white font-bold text-center">{title}</Text>
            <Button onPress={() => router.back()} className='p-1 relative bg-transparent'>
              <MaterialIcons name="arrow-back" size={30} color="white" />
            </Button>
          </View>
        )}
        {path === "settings/index.tsx" && (
          <View className='w-full bg-primary-800 flex flex-row justify-between p-2 items-center '>
            <Button onPress={() => router.back()} className='p-1 relative bg-transparent'>
              <MaterialIcons name="arrow-back" size={30} color="white" />
            </Button>
            <Pressable onPress={() => router.navigate('/home')} className='p-1 relative bg-transparent'>
              <Text className="text-3xl text-white font-bold text-center">{title}</Text>
            </Pressable>
            <Button onPress={handleLogoutModal} className='p-1 relative bg-transparent'>
              <MaterialIcons name="logout" size={30} color="white" />
            </Button>
          </View>
        )}
        {path === "home.tsx" && (
          <View className='w-full bg-primary-800 flex flex-row justify-between p-2 items-center '>
            <Text className="text-3xl text-white font-bold text-center">{title}</Text>
            <TouchableOpacity onPress={() => setIsDark(!isDark)}>
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              {!isDark ? (
                // 🌞 SOL
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                // 🌙 LUA
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </Svg>
          </TouchableOpacity>
          </View>
        )}
        {logoutModalVisible && (
          <ModalComponent visible={logoutModalVisible} onClose={() => setLogoutModalVisible(false)} title="Logout">
            <Text className='text-black dark:text-white'>Deseja sair?</Text>
            <View className='flex-row gap-4 mt-4 justify-end'>
              <Button onPress={() => setLogoutModalVisible(false)} variant="outline"><Text className='text-black dark:text-white'>Cancelar</Text></Button>
              <Button onPress={() => { setLogoutModalVisible(false); router.navigate('/'); }} variant="default"><Text className='text-white'>Sair</Text></Button>
            </View>
          </ModalComponent>)}
        {notificationModalVisible && (
          <SlideModalComponent visible={notificationModalVisible} onClose={() => setNotificationModalVisible(false)} title="Notificações">
            <Text className='text-black dark:text-white'>Voce tem novas notificações!</Text>
            <View className='flex-row gap-4 mt-4 justify-end'>
              <Button onPress={() => setNotificationModalVisible(false)} variant="outline"><Text className='text-black dark:text-white'>Cancelar</Text></Button>
              <Button onPress={() => { setNotificationModalVisible(false); router.navigate('/'); }} variant="default"><Text className='text-white'>Ver Notificações</Text></Button>
            </View>
          </SlideModalComponent>)}
          <View className="flex-1 items-center p-[5vh]">
            {children}
          </View>
      </SafeAreaView>
    </SafeAreaProvider>

  );
};
