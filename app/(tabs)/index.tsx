import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Platform, useWindowDimensions } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { CalculatorProvider, useCalculator } from '@/contexts/CalculatorContext';
import { Selector } from '@/components/UI/Selector';
import { InputField } from '@/components/UI/InputField';
import { Button } from '@/components/UI/Button';
import { ResultCard } from '@/components/Calculator/ResultCard';
import { DirectionToggle } from '@/components/Calculator/DirectionToggle';
import { currencies, allPairs } from '@/constants/forexPairs';

function CalculatorContent() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  
  const {
    accountCurrency,
    currencyPair,
    lotSize,
    entryPrice,
    slPrice,
    tpPrice,
    isBuying,
    takeProfit,
    stopLoss,
    setAccountCurrency,
    setCurrencyPair,
    setLotSize,
    setEntryPrice,
    setSlPrice,
    setTpPrice,
    setIsBuying,
    calculate,
  } = useCalculator();

  const currencyOptions = currencies.map(currency => ({
    value: currency.code,
    label: currency.code,
    description: currency.name,
  }));

  const pairOptions = allPairs.map(pair => ({
    value: pair.code,
    label: pair.name,
    description: pair.description,
  }));

  useEffect(() => {
    if (entryPrice && (tpPrice || slPrice)) {
      calculate();
    }
  }, [lotSize, entryPrice, tpPrice, slPrice, isBuying, currencyPair]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          isLargeScreen && styles.largeScreenContent
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.calculatorContainer, isLargeScreen && styles.largeScreenCalculator]}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Selector
                label="Account Currency"
                value={accountCurrency}
                options={currencyOptions}
                onSelect={setAccountCurrency}
              />
            </View>
            <View style={styles.column}>
              <Selector
                label="Forex Pair"
                value={currencyPair}
                options={pairOptions}
                onSelect={setCurrencyPair}
              />
            </View>
          </View>

          <InputField
            label="Lot Size"
            value={lotSize}
            onChangeText={setLotSize}
            keyboardType="decimal-pad"
            placeholder="0.01"
          />

          <DirectionToggle isBuying={isBuying} onToggle={setIsBuying} />

          <InputField
            label="Entry Price"
            value={entryPrice}
            onChangeText={setEntryPrice}
            keyboardType="decimal-pad"
            placeholder="0.00000"
          />

          <View style={styles.row}>
            <View style={styles.column}>
              <InputField
                label="SL Price"
                value={slPrice}
                onChangeText={setSlPrice}
                keyboardType="decimal-pad"
                placeholder="0.00000"
              />
            </View>
            <View style={styles.column}>
              <InputField
                label="TP Price"
                value={tpPrice}
                onChangeText={setTpPrice}
                keyboardType="decimal-pad"
                placeholder="0.00000"
              />
            </View>
          </View>

          <Button
            title="CALCULATE"
            onPress={calculate}
            variant="success"
            fullWidth
            style={styles.calculateButton}
          />

          <View style={styles.resultRow}>
            <ResultCard
              title="Take Profit"
              pips={takeProfit.pips}
              amount={takeProfit.amount}
              currency={accountCurrency}
              isProfit={true}
            />
            <ResultCard
              title="Stop Loss"
              pips={Math.abs(stopLoss.pips)}
              amount={stopLoss.amount}
              currency={accountCurrency}
              isProfit={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function Calculator() {
  return (
    <CalculatorProvider>
      <CalculatorContent />
    </CalculatorProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    paddingTop: Platform.OS === 'ios' ? 16 : 40,
  },
  largeScreenContent: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  calculatorContainer: {
    width: '100%',
  },
  largeScreenCalculator: {
    maxWidth: 800,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
  },
  calculateButton: {
    marginVertical: 24,
  },
  resultRow: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
});