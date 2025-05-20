import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ViewStyle 
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { X } from 'lucide-react-native';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  errorMessage?: string;
  editable?: boolean;
  style?: ViewStyle;
  showClearButton?: boolean;
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  secureTextEntry = false,
  errorMessage,
  editable = true,
  style,
  showClearButton = false,
}: InputFieldProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View style={[styles.container, style]}>
      <Text 
        style={[
          styles.label, 
          { 
            color: errorMessage ? colors.error : colors.textSecondary,
            fontFamily: 'Inter-Medium'
          }
        ]}
      >
        {label}
      </Text>
      
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.inputBackground,
            borderColor: isFocused 
              ? colors.primary 
              : errorMessage 
                ? colors.error 
                : colors.border,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              fontFamily: 'Inter-Regular',
            },
            !editable && { color: colors.textSecondary },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {showClearButton && value !== '' && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <X size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      
      {errorMessage && (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  clearButton: {
    padding: 4,
  },
});