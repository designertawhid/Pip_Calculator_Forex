import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/UI/Card';
import { formatAmount } from '@/utils/calculations';

interface ResultCardProps {
  title: string;
  pips: number;
  amount: number;
  currency: string;
  isProfit?: boolean;
}

export function ResultCard({ 
  title, 
  pips, 
  amount, 
  currency,
  isProfit = true 
}: ResultCardProps) {
  const { colors } = useTheme();
  
  const textColor = isProfit ? colors.profit : colors.loss;
  
  return (
    <Card style={styles.card}>
      <Text style={[styles.title, { color: textColor, fontFamily: 'Inter-SemiBold' }]}>
        {title}
      </Text>
      
      <View style={styles.resultContainer}>
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.textSecondary, fontFamily: 'Inter-Regular' }]}>
            Pips
          </Text>
          <Text style={[styles.value, { color: textColor, fontFamily: 'Inter-Bold' }]}>
            {Math.abs(pips).toFixed(1)}
          </Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.textSecondary, fontFamily: 'Inter-Regular' }]}>
            Amount ({currency})
          </Text>
          <Text style={[styles.value, { color: textColor, fontFamily: 'Inter-Bold' }]}>
            {formatAmount(amount, currency)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
  },
  title: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  resultContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  section: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
    opacity: 0.8,
  },
  value: {
    fontSize: 24,
    textAlign: 'center',
    minWidth: 100,
  },
});