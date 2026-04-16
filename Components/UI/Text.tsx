import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
  children: React.ReactNode;
  className?: string;
}

export function TextTitle({ children, className = '', ...props }: TextProps) {
  return (
    <RNText
      className={`text-2xl font-bold text-gray-900 dark:text-white ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function TextSubtitle({ children, className = '', ...props }: TextProps) {
  return (
    <RNText
      className={`text-lg font-semibold text-gray-700 dark:text-gray-300 ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function TextApp({ children, className = '', ...props }: TextProps) {
  return (
    <RNText
      className={`text-gray-800 dark:text-white ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function TextDescription({ children, className = '', ...props }: TextProps) {
  return (
    <RNText
      className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}
