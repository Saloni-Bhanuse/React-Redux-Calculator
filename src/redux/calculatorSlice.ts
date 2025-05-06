import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CalculatorState {
  displayValue: string;
  previousValue: string;
  operation: string | null;
  waitingForOperand: boolean;
  error?: string; // <-- Add error field
}

const initialState: CalculatorState = {
  displayValue: '0',
  previousValue: '',
  operation: null,
  waitingForOperand: false,
  error: '', // <-- Add error field
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    inputDigit: (state, action: PayloadAction<string>) => {
      const { displayValue, waitingForOperand } = state;
      const digit = action.payload;

      // Clear error on new input
      state.error = '';

      if (waitingForOperand) {
        state.displayValue = digit;
        state.waitingForOperand = false;
      } else {
        // Block leading zeros
        if (displayValue === '0') {
          state.displayValue = digit;
        } else if (displayValue === '-0') {
          state.displayValue = '-' + digit;
        } else {
          state.displayValue = displayValue + digit;
        }
      }
    },
    inputDecimal: (state) => {
      const { displayValue, waitingForOperand } = state;

      // Clear error on new input
      state.error = '';

      if (waitingForOperand) {
        state.displayValue = '0.';
        state.waitingForOperand = false;
      } else if (displayValue.indexOf('.') === -1) {
        state.displayValue = displayValue + '.';
      }
    },
    clearDisplay: (state) => {
      state.displayValue = '0';
      state.error = '';
    },
    clearAll: () => {
      return { ...initialState };
    },
    toggleSign: (state) => {
      state.displayValue = state.displayValue.charAt(0) === '-' 
        ? state.displayValue.substring(1) 
        : '-' + state.displayValue;
    },
    inputPercent: (state) => {
      state.error = '';
      const value = parseFloat(state.displayValue) / 100;
      state.displayValue = String(value);
    },
    performOperation: (state, action: PayloadAction<string>) => {
      const { displayValue, previousValue, operation } = state;
      const inputValue = parseFloat(displayValue);
      const prevValue = parseFloat(previousValue);
      let newValue = 0;

      state.error = '';

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
            if (inputValue === 0) {
              state.displayValue = 'Error';
              state.previousValue = '';
              state.operation = null;
              state.waitingForOperand = true;
              state.error = 'Cannot divide by 0';
              return;
            }
            newValue = prevValue / inputValue;
            break;
          default:
            newValue = inputValue;
        }
        state.displayValue = String(Number(newValue.toPrecision(12)));
        state.previousValue = String(Number(newValue.toPrecision(12)));
      } else {
        state.previousValue = displayValue;
      }

      state.waitingForOperand = true;
      state.operation = action.payload;
    },
    calculateResult: (state) => {
      const { displayValue, previousValue, operation } = state;
      
      state.error = '';

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
          if (inputValue === 0) {
            state.displayValue = 'Error';
            state.previousValue = '';
            state.operation = null;
            state.waitingForOperand = true;
            state.error = 'Cannot divide by 0';
            return;
          }
          newValue = prevValue / inputValue;
          break;
        default:
          return;
      }

      state.displayValue = String(Number(newValue.toPrecision(12)));
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
