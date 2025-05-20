import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface DirectionToggleProps {
  isBuying: boolean;
  onToggle: (isBuying: boolean) => void;
}

export function DirectionToggle({ isBuying, onToggle }: DirectionToggleProps) {
  const { colors } = useTheme();
  
  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: colors.inputBackground, borderColor: colors.border }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          isBuying && { backgroundColor: colors.primary },
        ]}
        onPress={() => onToggle(true)}
      >
        <Text 
          style={[
            styles.buttonText, 
            { 
              color: isBuying ? '#FFFFFF' : colors.textSecondary,
              fontFamily: 'Inter-SemiBold'
            }
          ]}
        >
          BUY
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.button,
          !isBuying && { backgroundColor: colors.error },
        ]}
        onPress={() => onToggle(false)}
      >
        <Text 
          style={[
            styles.buttonText, 
            { 
              color: !isBuying ? '#FFFFFF' : colors.textSecondary,
              fontFamily: 'Inter-SemiBold'
            }
          ]}
        >
          SELL
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});