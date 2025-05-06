import React from 'react';
import Display from './Display';
import Keypad from './Keypad';

const Calculator: React.FC = () => {
  return (
    <div className="calculator">
      <Display />
      <Keypad />
    </div>
  );
};

export default Calculator;
