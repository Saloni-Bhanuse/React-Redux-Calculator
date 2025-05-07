import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const Display: React.FC = () => {
  const currentInput = useSelector((state: RootState) => state.calculator.currentInput);
  const expression = useSelector((state: RootState) => state.calculator.expression);
  const error = useSelector((state: RootState) => state.calculator.error);

  // Convert expression array to string if needed
  const expressionString = Array.isArray(expression) ? expression.join(' ') : expression;

  return (
    <div>
      <output className="calculator-display" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', width: '100%', height: '100%' }}>
        <span
          style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.7)',
            minHeight: '24px',
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            textAlign: 'right',
          }}
        >
 
        </span>
        <span
          style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.7)',
            minHeight: '24px',
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            textAlign: 'right',
          }}
        >
          {expressionString}
        </span>
        <span>
          {error ? error : currentInput}
        </span>
      </output>
    </div>
  );
};

export default Display;
