import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export type ToastType = 'success' | 'error';

interface ToastState {
  message: string;
  type: ToastType;
}

interface UseToastNotificationResult {
  toast: ToastState | null;
  toastProgress: number;
  toastOpacity: Animated.Value;
  toastTranslateY: Animated.Value;
  toastScale: Animated.Value;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

export function useToastNotification(): UseToastNotificationResult {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [toastProgress, setToastProgress] = useState(100);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTranslateY = useRef(new Animated.Value(-14)).current;
  const toastScale = useRef(new Animated.Value(0.98)).current;

  const animateToastIn = () => {
    toastOpacity.setValue(0);
    toastTranslateY.setValue(-14);
    toastScale.setValue(0.98);

    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(toastTranslateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(toastScale, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateToastOut = (onEnd?: () => void) => {
    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(toastTranslateY, {
        toValue: -10,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(toastScale, {
        toValue: 0.99,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onEnd?.();
    });
  };

  const hideToast = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    animateToastOut(() => setToast(null));
  };

  const showToast = (message: string, type: ToastType) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToast({ message, type });
    setToastProgress(100);

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const duration = 5000;
    const startedAt = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.max(0, 100 - (elapsed / duration) * 100);
      setToastProgress(nextProgress);

      if (elapsed >= duration && progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }, 50);

    timeoutRef.current = setTimeout(() => {
      hideToast();
      timeoutRef.current = null;
    }, duration);
  };

  useEffect(() => {
    if (toast) {
      animateToastIn();
    }
  }, [toast]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  return {
    toast,
    toastProgress,
    toastOpacity,
    toastTranslateY,
    toastScale,
    showToast,
    hideToast,
  };
}
