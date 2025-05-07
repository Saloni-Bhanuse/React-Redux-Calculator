import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  inputDigit,
  inputDecimal,
  performOperation,
  calculateResult,
  clearAll,
  backspace,
} from "../redux/calculatorSlice";

export function useCalculatorKeyboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key;

      // Numbers 0-9
      if (/^[0-9]$/.test(key)) {
        dispatch(inputDigit(key));
        e.preventDefault();
        return;
      }

      // Decimal point
      if (key === "." || key === ",") {
        dispatch(inputDecimal());
        e.preventDefault();
        return;
      }

      // Operators (handle both shifted and unshifted keys)
      if (key === "+" || (key === "=" && e.shiftKey)) { // Shift + '=' is '+'
        dispatch(performOperation("+"));
        e.preventDefault();
        return;
      }
      if (key === "-") {
        dispatch(performOperation("-"));
        e.preventDefault();
        return;
      }
      if (key === "*" || key === "×") {
        dispatch(performOperation("×"));
        e.preventDefault();
        return;
      }
      if (key === "/" || key === "÷") {
        dispatch(performOperation("÷"));
        e.preventDefault();
        return;
      }

      // Equals / Enter
      if (key === "Enter" || key === "=") {
        dispatch(calculateResult());
        e.preventDefault();
        return;
      }

      // Backspace
      if (key === "Backspace") {
        dispatch(backspace());
        e.preventDefault();
        return;
      }

      // Escape (All Clear)
      if (key === "Escape") {
        dispatch(clearAll());
        e.preventDefault();
        return;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);
}