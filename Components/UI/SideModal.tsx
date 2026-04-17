import  MaterialCommunityIcons  from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Animated, Modal, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useToggleTheme } from 'Hooks/useToggleTheme';

interface ModalProps {
  visible: boolean;
  title?: string;
  side?: 'left' | 'right';
  onClose: () => void;
  children: React.ReactNode;
}

export default function SlideModalComponent({
  visible,
  title,
  side = 'right',
  onClose,
  children,
}: ModalProps) {
  const { isDark } = useToggleTheme();
  const { width } = useWindowDimensions();
  const panelWidth = Math.min(Math.max(width * 0.8, 280), 420);
  const initialTranslateX = side === 'left' ? -width : width;
  const translateX = useRef(new Animated.Value(initialTranslateX)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [internalVisible, setInternalVisible] = useState(false);

  const runCloseAnimation = useCallback(() => {
    const exitTranslateX = side === 'left' ? -width : width;

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: exitTranslateX,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setInternalVisible(false);
    });
  }, [side, width]);

  // Sync with external visible prop
  useEffect(() => {
    if (visible && !internalVisible) {
      // Opening: reset values and show modal
      translateX.setValue(side === 'left' ? -width : width);
      backdropOpacity.setValue(0);
      setInternalVisible(true);
    } else if (!visible && internalVisible) {
      // External close requested: animate out
      runCloseAnimation();
    }
  }, [visible, internalVisible, side, width, runCloseAnimation]);

  // Watches internalVisible to trigger open animation after mount
  useEffect(() => {
    if (internalVisible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [internalVisible]);

  const handleClose = useCallback(() => {
    runCloseAnimation();
    // Notify parent immediately
    onClose();
  }, [runCloseAnimation, onClose]);

  if (!internalVisible) {
    return null;
  }

  return (
    <Modal
      visible={true}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View className="flex-1">
        <Pressable
          className="absolute inset-0"
          onPress={handleClose}
        >
          <Animated.View
            pointerEvents="none"
            className="absolute inset-0 bg-black/50"
            style={{ opacity: backdropOpacity }}
          />
        </Pressable>
        <Animated.View
          className="h-full bg-white dark:bg-gray-800 p-6"
          style={{
            width: panelWidth,
            alignSelf: side === 'left' ? 'flex-start' : 'flex-end',
            transform: [{ translateX }],
          }}
        >
          {title && (
            <>
              <View className="flex-row items-center justify-between mb-4">
                <Text className="mb-4 text-5xl font-bold text-gray-800 dark:text-white">
                  {title}
                </Text>
                <MaterialCommunityIcons name="window-close" size={24} color={isDark ? "white" : "black"} onPress={handleClose} className='absolute top-4 right-4' />
              </View>
            </>
          )}
          <View className="mb-4">{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}
