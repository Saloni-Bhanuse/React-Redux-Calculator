// import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import Decimal from 'decimal.js';

// interface CalculatorState {
//   currentInput: string;
//   expression: string;
//   result: string;
//   operator: string | null;
//   waitingForOperand: boolean;
//   error: string;
//   lastPressedEquals: boolean;
// }

// const initialState: CalculatorState = {
//   currentInput: '0',
//   expression: '',
//   result: '',
//   operator: null,
//   waitingForOperand: false,
//   error: '',
//   lastPressedEquals: false,
// };

// function evaluateExpression(expression: string): string | { error: string } {
//   try {
//     // Replace × and ÷ with * and / for eval
//     const safeExpr = expression.replace(/×/g, '*').replace(/÷/g, '/');
//     // Use decimal.js for evaluation
//     // Split by operators and evaluate step by step for operator precedence
//     // For simplicity, use eval with Decimal for each operation
//     // (For production, use a proper parser)
//     // eslint-disable-next-line no-eval
//     const result = new Decimal(eval(safeExpr));
//     return result.toPrecision(10).replace(/\.?0+$/, '');
//   } catch (e: any) {
//     if (e instanceof Error && e.message.includes('Division by zero')) {
//       return { error: 'Cannot divide by 0' };
//     }
//     return { error: 'Invalid Expression' };
//   }
// }

// const calculatorSlice = createSlice({
//   name: 'calculator',
//   initialState,
//   reducers: {
//     inputDigit: (state, action: PayloadAction<string>) => {
//       if (state.error) {
//         // Reset on error
//         state.currentInput = action.payload;
//         state.expression = '';
//         state.result = '';
//         state.operator = null;
//         state.waitingForOperand = false;
//         state.error = '';
//         state.lastPressedEquals = false;
//         return;
//       }
//       if (state.lastPressedEquals) {
//         state.currentInput = action.payload;
//         state.expression = '';
//         state.result = '';
//         state.operator = null;
//         state.waitingForOperand = false;
//         state.lastPressedEquals = false;
//         return;
//       }
//       if (state.waitingForOperand) {
//         state.currentInput = action.payload;
//         state.waitingForOperand = false;
//       } else {
//         // Block leading zeros
//         if (state.currentInput === '0') {
//           state.currentInput = action.payload;
//         } else if (state.currentInput === '-0') {
//           state.currentInput = '-' + action.payload;
//         } else {
//           state.currentInput += action.payload;
//         }
//       }
//     },
//     inputDecimal: (state) => {
//       if (state.error) {
//         state.currentInput = '0.';
//         state.expression = '';
//         state.result = '';
//         state.operator = null;
//         state.waitingForOperand = false;
//         state.error = '';
//         state.lastPressedEquals = false;
//         return;
//       }
//       if (state.lastPressedEquals) {
//         state.currentInput = '0.';
//         state.expression = '';
//         state.result = '';
//         state.operator = null;
//         state.waitingForOperand = false;
//         state.lastPressedEquals = false;
//         return;
//       }
//       if (state.waitingForOperand) {
//         state.currentInput = '0.';
//         state.waitingForOperand = false;
//       } else if (!state.currentInput.includes('.')) {
//         state.currentInput += '.';
//       }
//     },
//     clearAll: () => {
//       return { ...initialState };
//     },
//     toggleSign: (state) => {
//       if (state.currentInput.startsWith('-')) {
//         state.currentInput = state.currentInput.substring(1);
//       } else {
//         state.currentInput = '-' + state.currentInput;
//       }
//     },
//     inputPercent: (state) => {
//       try {
//         const value = new Decimal(state.currentInput).div(100);
//         state.currentInput = value.toPrecision(10).replace(/\.?0+$/, '');
//       } catch {
//         state.error = 'Invalid Input';
//       }
//     },
//     performOperation: (state, action: PayloadAction<string>) => {
//       if (state.error) return;
//       if (state.lastPressedEquals) {
//         state.expression = state.result;
//         state.lastPressedEquals = false;
//       }
//       if (state.operator && !state.waitingForOperand) {
//         // Evaluate previous operation
//         state.expression += state.currentInput;
//         const evalResult = evaluateExpression(state.expression);
//         if (typeof evalResult === 'object' && evalResult.error) {
//           state.error = evalResult.error;
//           return;
//         }
//         state.result = evalResult as string;
//         state.expression = state.result + action.payload;
//         state.currentInput = state.result;
//       } else if (!state.expression || state.lastPressedEquals) {
//         state.expression = state.currentInput + action.payload;
//       } else {
//         state.expression += state.currentInput + action.payload;
//       }
//       state.operator = action.payload;
//       state.waitingForOperand = true;
//     },
//     calculateResult: (state) => {
//       if (state.error) return;
//       if (!state.operator) {
//         state.result = state.currentInput;
//         state.lastPressedEquals = true;
//         return;
//       }
//       state.expression += state.currentInput;
//       const evalResult = evaluateExpression(state.expression);
//       if (typeof evalResult === 'object' && evalResult.error) {
//         state.error = evalResult.error;
//         return;
//       }
//       state.result = evalResult as string;
//       state.currentInput = state.result;
//       state.expression = '';
//       state.operator = null;
//       state.waitingForOperand = false;
//       state.lastPressedEquals = true;
//     },
//     clearError: (state) => {
//       state.error = '';
//     }
//   },
// });

// export const {
//   inputDigit,
//   inputDecimal,
//   clearAll,
//   toggleSign,
//   inputPercent,
//   performOperation,
//   calculateResult,
//   clearError,
// } = calculatorSlice.actions;

// export default calculatorSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import Decimal from "decimal.js"

interface CalculatorState {
  currentInput: string
  expression: string
  result: string
  operator: string | null
  waitingForOperand: boolean
  error: string
  lastPressedEquals: boolean
  previousOperand: string | null
  previousOperator: string | null
}

const initialState: CalculatorState = {
  currentInput: "0",
  expression: "",
  result: "",
  operator: null,
  waitingForOperand: false,
  error: "",
  lastPressedEquals: false,
  previousOperand: null,
  previousOperator: null,
}

// Helper function to safely perform arithmetic operations with Decimal.js
function performArithmetic(a: string, b: string, operator: string): Decimal | { error: string } {
  try {
    const decimalA = new Decimal(a)
    const decimalB = new Decimal(b)

    switch (operator) {
      case "+":
        return decimalA.plus(decimalB)
      case "-":
        return decimalA.minus(decimalB)
      case "×":
        return decimalA.times(decimalB)
      case "÷":
        if (decimalB.isZero()) {
          return { error: "Cannot divide by 0" }
        }
        return decimalA.dividedBy(decimalB)
      default:
        return decimalA
    }
  } catch (e) {
    return { error: "Invalid Operation" }
  }
}

// Format result to avoid floating point issues and excessive decimals
function formatResult(decimal: Decimal): string {
  // Always round to 2 decimal places for display
  const result = decimal.toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
  // If the result is an integer, show without decimals; otherwise, show two decimals
  if (result.isInteger()) {
    return result.toFixed(0);
  }
  return result.toFixed(2);
}

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    inputDigit: (state, action: PayloadAction<string>) => {
      if (state.error) {
        // Reset on error
        state.currentInput = action.payload
        state.expression = ""
        state.result = ""
        state.operator = null
        state.waitingForOperand = false
        state.error = ""
        state.lastPressedEquals = false
        state.previousOperand = null
        state.previousOperator = null
        return
      }

      if (state.lastPressedEquals) {
        // Start a new calculation after equals
        state.currentInput = action.payload
        state.expression = ""
        state.result = ""
        state.operator = null
        state.waitingForOperand = false
        state.lastPressedEquals = false
        return
      }

      if (state.waitingForOperand) {
        state.currentInput = action.payload
        state.waitingForOperand = false
      } else {
        // Block leading zeros
        if (state.currentInput === "0") {
          state.currentInput = action.payload
        } else if (state.currentInput === "-0") {
          state.currentInput = "-" + action.payload
        } else {
          state.currentInput += action.payload
        }
      }
    },

    inputDecimal: (state) => {
      if (state.error) {
        state.currentInput = "0."
        state.expression = ""
        state.result = ""
        state.operator = null
        state.waitingForOperand = false
        state.error = ""
        state.lastPressedEquals = false
        state.previousOperand = null
        state.previousOperator = null
        return
      }

      if (state.lastPressedEquals) {
        state.currentInput = "0."
        state.expression = ""
        state.result = ""
        state.operator = null
        state.waitingForOperand = false
        state.lastPressedEquals = false
        return
      }

      if (state.waitingForOperand) {
        state.currentInput = "0."
        state.waitingForOperand = false
      } else if (!state.currentInput.includes(".")) {
        state.currentInput += "."
      }
    },

    clearAll: () => {
      return { ...initialState }
    },

    toggleSign: (state) => {
      if (state.currentInput.startsWith("-")) {
        state.currentInput = state.currentInput.substring(1)
      } else {
        state.currentInput = "-" + state.currentInput
      }
    },

    inputPercent: (state) => {
      try {
        const value = new Decimal(state.currentInput).div(100)
        state.currentInput = value.toPrecision(10).replace(/\.?0+$/, '');
      } catch {
        state.error = "Invalid Input"
      }
    },

    performOperation: (state, action: PayloadAction<string>) => {
      if (state.error) return

      const newOperator = action.payload

      // If we just pressed equals, use the result as the first operand of a new calculation
      if (state.lastPressedEquals) {
        state.expression = state.currentInput + " " + newOperator + " "
        state.operator = newOperator
        state.waitingForOperand = true
        state.lastPressedEquals = false
        state.previousOperand = state.currentInput
        state.previousOperator = newOperator
        return
      }

      // If we're waiting for an operand, just update the operator
      if (state.waitingForOperand) {
        // Allow changing the operator if the user hasn't entered a second operand yet
        const expressionWithoutLastOperator = state.expression.slice(0, -2)
        state.expression = expressionWithoutLastOperator + newOperator + " "
        state.operator = newOperator
        return
      }

      // If there's a pending operation, calculate the result first
      if (state.operator) {
        // Update expression to include the current input before calculating
        state.expression += state.currentInput

        const result = performArithmetic(
          state.previousOperand || state.result || state.currentInput,
          state.currentInput,
          state.operator,
        )

        if ("error" in result) {
          state.error = result.error
          return
        }

        const formattedResult = formatResult(result)
        state.result = formattedResult
        state.currentInput = formattedResult
        state.expression = formattedResult + " " + newOperator + " "
      } else {
        // First operation in a sequence
        state.expression = state.currentInput + " " + newOperator + " "
        state.result = state.currentInput
      }

      state.operator = newOperator
      state.waitingForOperand = true
      state.previousOperand = state.currentInput
      state.previousOperator = newOperator
    },

    calculateResult: (state) => {
      if (state.error) return

      // If there's no operator, just use the current input as the result
      if (!state.operator && !state.previousOperator) {
        state.result = state.currentInput
        state.lastPressedEquals = true
        return
      }

      // If we just pressed equals and press it again, repeat the last operation
      if (state.lastPressedEquals && state.previousOperator) {
        // Show the expression for repeated equals operations
        state.expression = state.currentInput + " " + state.previousOperator + " " + state.previousOperand

        const result = performArithmetic(state.currentInput, state.previousOperand || "0", state.previousOperator)

        if ("error" in result) {
          state.error = result.error
          return
        }

        state.result = formatResult(result)
        state.currentInput = state.result
        // Keep the expression visible until a new operation starts
        return
      }

      // Normal equals operation - update expression to show full calculation
      if (!state.expression.includes(state.currentInput)) {
        state.expression += state.currentInput
      }

      const result = performArithmetic(
        state.previousOperand || state.result || "0",
        state.currentInput,
        state.operator || state.previousOperator || "+",
      )

      if ("error" in result) {
        state.error = result.error
        return
      }

      // Save the full expression before showing the result
      const fullExpression = state.expression

      state.result = formatResult(result)
      state.currentInput = state.result
      // Keep the expression visible until a new operation starts
      state.previousOperand = state.currentInput
      state.previousOperator = state.operator
      state.operator = null
      state.waitingForOperand = false
      state.lastPressedEquals = true
    },

    clearError: (state) => {
      state.error = ""
      state.currentInput = "0"
      state.waitingForOperand = false
    },
  },
})

export const {
  inputDigit,
  inputDecimal,
  clearAll,
  toggleSign,
  inputPercent,
  performOperation,
  calculateResult,
  clearError,
} = calculatorSlice.actions

export default calculatorSlice.reducer
