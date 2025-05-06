import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CalculatorState {
  displayValue: string;
  previousValue: string;
  operation: string | null;
  waitingForOperand: boolean;
}

const initialState: CalculatorState = {
  displayValue: '0',
  previousValue: '',
  operation: null,
  waitingForOperand: false,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    inputDigit: (state, action: PayloadAction<string>) => {
      const { displayValue, waitingForOperand } = state;
      const digit = action.payload;

      if (waitingForOperand) {
        state.displayValue = digit;
        state.waitingForOperand = false;
      } else {
        state.displayValue = displayValue === '0' ? digit : displayValue + digit;
      }
    },
    inputDecimal: (state) => {
      const { displayValue, waitingForOperand } = state;

      if (waitingForOperand) {
        state.displayValue = '0.';
        state.waitingForOperand = false;
      } else if (displayValue.indexOf('.') === -1) {
        state.displayValue = displayValue + '.';
      }
    },
    clearDisplay: (state) => {
      state.displayValue = '0';
    },
    clearAll: () => {
      return initialState;
    },
    toggleSign: (state) => {
      // Toggle the sign of the current display value
      state.displayValue = state.displayValue.charAt(0) === '-' 
        ? state.displayValue.substring(1) 
        : '-' + state.displayValue;
    },
    inputPercent: (state) => {
      // Convert the current display value to a percentage
      const value = parseFloat(state.displayValue) / 100;
      state.displayValue = String(value);
    },
    performOperation: (state, action: PayloadAction<string>) => {
      const { displayValue, previousValue, operation } = state;
      const inputValue = parseFloat(displayValue);
      const prevValue = parseFloat(previousValue);
      let newValue = 0;

      if (previousValue && operation) {
        switch (operation) {
          case '+':
            newValue = prevValue + inputValue;
            break;
          case '-':
            newValue = prevValue - inputValue;
            break;
          case '×':
            newValue = prevValue * inputValue;
            break;
          case '÷':
            newValue = prevValue / inputValue;
            break;
          default:
            newValue = inputValue;
        }
        state.displayValue = String(newValue);
        state.previousValue = String(newValue);
      } else {
        state.previousValue = displayValue;
      }

      state.waitingForOperand = true;
      state.operation = action.payload;
    },
    calculateResult: (state) => {
      const { displayValue, previousValue, operation } = state;
      
      if (!previousValue || !operation) return;
      
      const inputValue = parseFloat(displayValue);
      const prevValue = parseFloat(previousValue);
      let newValue = 0;

      switch (operation) {
        case '+':
          newValue = prevValue + inputValue;
          break;
        case '-':
          newValue = prevValue - inputValue;
          break;
        case '×':
          newValue = prevValue * inputValue;
          break;
        case '÷':
          newValue = prevValue / inputValue;
          break;
        default:
          return;
      }

      state.displayValue = String(newValue);
      state.previousValue = '';
      state.operation = null;
      state.waitingForOperand = true;
    }
  },
});

export const { 
  inputDigit, 
  inputDecimal, 
  clearDisplay, 
  clearAll, 
  toggleSign, 
  inputPercent, 
  performOperation, 
  calculateResult 
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
