import { getPipValue } from '@/constants/forexPairs';

export const calculatePipValue = (
  lotSize: number,
  pairCode: string,
  accountCurrency: string
): number => {
  const pipValue = getPipValue(pairCode);
  
  // Special handling for XAUUSD (Gold)
  if (pairCode === 'XAUUSD') {
    return lotSize * 10; // 0.01 lot = $0.10 per pip
  }
  
  // Standard pip value calculation for other pairs
  const standardLot = 100000; // Standard lot size in forex
  return (lotSize * standardLot) * pipValue;
};

export const calculateProfit = (
  lotSize: number,
  entryPrice: number,
  exitPrice: number,
  pairCode: string,
  accountCurrency: string,
  isBuy: boolean
): { pips: number; amount: number } => {
  if (!entryPrice || !exitPrice) {
    return { pips: 0, amount: 0 };
  }

  const pipSize = getPipValue(pairCode);
  let priceDiff = exitPrice - entryPrice;
  
  // For sell orders, we need to reverse the calculation
  if (!isBuy) {
    priceDiff = entryPrice - exitPrice;
  }
  
  // Special handling for XAUUSD (Gold)
  if (pairCode === 'XAUUSD') {
    const pips = priceDiff * 10; // Convert price difference to pips (multiply by 10)
    const pipValuePerLot = calculatePipValue(lotSize, pairCode, accountCurrency);
    const amount = pips * pipValuePerLot;
    return { pips, amount };
  }
  
  // Standard calculation for other pairs
  const pips = priceDiff / pipSize;
  const pipValuePerLot = calculatePipValue(lotSize, pairCode, accountCurrency);
  const amount = pips * pipValuePerLot;
  
  return { pips, amount };
};

// Handle special cases for pip calculation
export const formatPips = (pips: number): string => {
  return pips.toFixed(1);
};

// Format monetary amounts with proper currency symbol
export const formatAmount = (amount: number, currency: string): string => {
  // Format with 2 decimal places
  const formatted = Math.abs(amount).toFixed(2);
  
  // Simple mapping for common currency symbols
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'Fr',
    NZD: 'NZ$',
  };
  
  const symbol = symbols[currency] || currency;
  
  if (amount < 0) {
    return `-${symbol}${formatted}`;
  }
  return `${symbol}${formatted}`;
};