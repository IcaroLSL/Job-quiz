import { MaterialIcons } from '@expo/vector-icons';
import { ToastType } from 'Hooks/useToastNotification';
import { Animated, Pressable, Text, View } from 'react-native';

interface ToastNotificationProps {
  toast: { message: string; type: ToastType } | null;
  toastProgress: number;
  toastOpacity: Animated.Value;
  toastTranslateY: Animated.Value;
  toastScale: Animated.Value;
  onClose: () => void;
}

export function ToastNotification({
  toast,
  toastProgress,
  toastOpacity,
  toastTranslateY,
  toastScale,
  onClose,
}: ToastNotificationProps) {
  if (!toast) {
    return null;
  }

  return (
    <Animated.View
      className='absolute right-0 top-2 z-50 w-full max-w-[360px]'
      style={{
        opacity: toastOpacity,
        transform: [{ translateY: toastTranslateY }, { scale: toastScale }],
      }}
    >
      <View className='relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800'>
        <View className={`absolute bottom-0 left-0 top-0 w-1 ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
        <View className='flex-row items-center gap-2 px-3 py-3 pl-4'>
          <MaterialIcons
            name={toast.type === 'success' ? 'check-circle' : 'error'}
            size={20}
            color={toast.type === 'success' ? '#16a34a' : '#dc2626'}
          />
          <Text className='flex-1 font-semibold text-black dark:text-white'>
            {toast.message}
          </Text>
          <Pressable onPress={onClose} className='h-6 w-6 items-center justify-center'>
            <MaterialIcons
              name='close'
              size={18}
              color='#9ca3af'
            />
          </Pressable>
        </View>
        <View className='h-1 w-full bg-gray-200 dark:bg-gray-700'>
          <View
            className={`h-1 ${toast.type === 'success' ? 'bg-primary-500' : 'bg-primary-500'}`}
            style={{ width: `${toastProgress}%` }}
          />
        </View>
      </View>
    </Animated.View>
  );
}
