import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScreenContent } from 'Components/Page/ScreenContent';

export default function quiz() {
  return (
    <ScreenContent title='Quiz' path="quiz/index">
      <View className='bg-white dark:bg-dark-800 items-center justify-center flex-1'>
        <Text className='text-9xl font-bold text-black dark:text-white'>quiz</Text>
      </View>
    </ScreenContent>
  )
}
