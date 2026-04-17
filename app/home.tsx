import { ScreenContent } from 'Components/Page/ScreenContent';
import { router, type Href } from 'expo-router';
import { Image, Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  logo: {
    width: 192,
    height: 192,
    marginBottom: 16,
  },
});

interface MenuIcons {
  id: string;
  name: string;
  path: Href
}


export default function Home() {

  const data:
    MenuIcons[] = [
      { id: '1', name: 'quiz', path: '/quiz' },
      { id: '2', name: 'settings', path: '/settings' },
    ];

  return (
    <ScreenContent title='QuizOS' path="home.tsx">
      <View className='flex-1 w-full gap-4'>
        <View className="flex items-center justify-self-start w-full flex-row gap-4">
          <Pressable onPress={() => router.push('/profile')}>
            <Image
              className='w-[5em] h-[5em] object-cover rounded-md'
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsFnRgUL0HqzX_7n59jzk5_lGjlnSuaIWftw&s'
              }}
            />
          </Pressable>
          <Text className='text-black dark:text-white text-2xl font-bold'>Hello, world!</Text>
        </View>

        <ScrollView className='flex-1'>
          <View className='flex-row flex-wrap justify-center gap-4'>
            {data.map((item) => (
              <Pressable key={item.id} onPress={() => router.push(item.path)} className='w-[6em] h-[6em] bg-dark-blue-500 active:bg-dark-blue-600 active:opacity-75 rounded-lg flex items-center justify-center'>
                <MaterialIcons name={item.name} size={30} color="white" />
              </Pressable>
            ))}
          </View>
        </ScrollView>

      </View>


    </ScreenContent>
  );
}
