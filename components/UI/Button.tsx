import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const { colors } = useTheme();
  
  // Determine button and text colors based on variant
  const getButtonStyles = () => {
    const baseStyle: ViewStyle = {
      backgroundColor: colors.primary,
    };
    
    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = colors.primary;
        break;
      case 'secondary':
        baseStyle.backgroundColor = colors.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.primary;
        break;
      case 'success':
        baseStyle.backgroundColor = colors.success;
        break;
      case 'danger':
        baseStyle.backgroundColor = colors.error;
        break;
    }
    
    if (disabled) {
      baseStyle.backgroundColor = colors.disabled;
      baseStyle.borderColor = colors.disabled;
    }
    
    return baseStyle;
  };
  
  const getTextColor = () => {
    if (disabled) {
      return colors.textSecondary;
    }
    
    if (variant === 'outline') {
      return colors.primary;
    }
    
    return '#FFFFFF';
  };
  
  // Determine button size styles
  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 12,
        };
      case 'large':
        return {
          paddingVertical: 16,
          paddingHorizontal: 20,
        };
      case 'medium':
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 16,
        };
    }
  };
  
  const buttonStyles = [
    styles.button,
    getButtonStyles(),
    getSizeStyles(),
    fullWidth && styles.fullWidth,
    style,
  ];
  
  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text
          style={[
            styles.text,
            { color: getTextColor(), fontFamily: 'Inter-SemiBold' },
            size === 'small' && { fontSize: 14 },
            size === 'large' && { fontSize: 18 },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});