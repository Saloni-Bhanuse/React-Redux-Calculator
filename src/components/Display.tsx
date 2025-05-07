import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import type { RootState } from '../redux/store';

const selectCurrentInput = (state: RootState) => state.calculator.currentInput;
const selectExpression = (state: RootState) => state.calculator.expression;
const selectError = (state: RootState) => state.calculator.error;

const Display: React.FC = () => {
  const currentInput = useSelector(selectCurrentInput, shallowEqual);
  const expression = useSelector(selectExpression, shallowEqual);
  const error = useSelector(selectError, shallowEqual);

  const expressionString = Array.isArray(expression) ? expression.join(' ') : expression;

  return (
    <div>
      <output
        className="calculator-display"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {expressionString && (
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
        )}
        <span>
          {error ? error : currentInput}
        </span>
      </output>
    </div>
  );
};

export default Display;
