import { getPipValue } from '@/constants/forexPairs';

export const calculatePipValue = (
  lotSize: number,
  pairCode: string,
  accountCurrency: string
): number => {
  // Standard pip value calculation for major pairs
  // This is a simplified version - in a real app, you'd need more complex logic
  // for cross pairs and account currency conversion
  const pipValue = getPipValue(pairCode);
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