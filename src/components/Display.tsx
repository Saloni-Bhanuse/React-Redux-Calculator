import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const Display: React.FC = () => {
  const displayValue = useSelector((state: RootState) => state.calculator.displayValue);

  return (
      <output className="calculator-display">
        {displayValue}
      </output>
  );
};

export default Display;
