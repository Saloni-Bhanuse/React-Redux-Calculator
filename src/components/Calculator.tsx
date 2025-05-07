import React from 'react';
import Display from './Display';
import Keypad from './Keypad';
import { useCalculatorKeyboard } from '../hooks/useCalculatorKeyboard';

const Calculator: React.FC = () => {
  useCalculatorKeyboard();

  return (
    <div className="calculator">
      <Display />
      <Keypad />
    </div>
  );
};

export default Calculator;
