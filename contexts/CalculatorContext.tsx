import React, { createContext, useContext, useState } from 'react';
import { calculateProfit } from '@/utils/calculations';

interface CalculatorContextType {
  accountCurrency: string;
  currencyPair: string;
  lotSize: string;
  entryPrice: string;
  slPrice: string;
  tpPrice: string;
  isBuying: boolean;
  takeProfit: { pips: number; amount: number };
  stopLoss: { pips: number; amount: number };
  setAccountCurrency: (currency: string) => void;
  setCurrencyPair: (pair: string) => void;
  setLotSize: (size: string) => void;
  setEntryPrice: (price: string) => void;
  setSlPrice: (price: string) => void;
  setTpPrice: (price: string) => void;
  setIsBuying: (isBuying: boolean) => void;
  calculate: () => void;
}

const CalculatorContext = createContext<CalculatorContextType>({
  accountCurrency: 'USD',
  currencyPair: 'XAUUSD',
  lotSize: '0.01',
  entryPrice: '',
  slPrice: '',
  tpPrice: '',
  isBuying: true,
  takeProfit: { pips: 0, amount: 0 },
  stopLoss: { pips: 0, amount: 0 },
  setAccountCurrency: () => {},
  setCurrencyPair: () => {},
  setLotSize: () => {},
  setEntryPrice: () => {},
  setSlPrice: () => {},
  setTpPrice: () => {},
  setIsBuying: () => {},
  calculate: () => {},
});

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accountCurrency, setAccountCurrency] = useState('USD');
  const [currencyPair, setCurrencyPair] = useState('XAUUSD');
  const [lotSize, setLotSize] = useState('0.01');
  const [entryPrice, setEntryPrice] = useState('');
  const [slPrice, setSlPrice] = useState('');
  const [tpPrice, setTpPrice] = useState('');
  const [isBuying, setIsBuying] = useState(true);
  const [takeProfit, setTakeProfit] = useState({ pips: 0, amount: 0 });
  const [stopLoss, setStopLoss] = useState({ pips: 0, amount: 0 });

  const calculate = () => {
    if (!entryPrice) return;

    const numericLotSize = parseFloat(lotSize) || 0;
    const numericEntryPrice = parseFloat(entryPrice) || 0;
    
    // Calculate Take Profit if TP price is set
    if (tpPrice) {
      const numericTpPrice = parseFloat(tpPrice) || 0;
      const tp = calculateProfit(
        numericLotSize,
        numericEntryPrice,
        numericTpPrice,
        currencyPair,
        accountCurrency,
        isBuying
      );
      setTakeProfit(tp);
    }
    
    // Calculate Stop Loss if SL price is set
    if (slPrice) {
      const numericSlPrice = parseFloat(slPrice) || 0;
      const sl = calculateProfit(
        numericLotSize,
        numericEntryPrice,
        numericSlPrice,
        currencyPair,
        accountCurrency,
        !isBuying // Inverse of buying for stop loss
      );
      setStopLoss({ pips: sl.pips, amount: -Math.abs(sl.amount) }); // SL is always negative
    }
  };

  return (
    <CalculatorContext.Provider
      value={{
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
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext);