import React from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { 
  inputDigit, 
  inputDecimal, 
  clearAll, 
  toggleSign, 
  inputPercent, 
  performOperation, 
  calculateResult 
} from '../redux/calculatorSlice';

const Keypad: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="calculator-keypad">
      {/* First row */}
      <Button 
        onClick={() => dispatch(clearAll())} 
        className="function-key"
      >
        AC
      </Button>
      <Button 
        onClick={() => dispatch(toggleSign())} 
        className="function-key"
      >
        +/-
      </Button>
      <Button 
        onClick={() => dispatch(inputPercent())} 
        className="function-key"
      >
        %
      </Button>
      <Button 
        onClick={() => dispatch(performOperation('÷'))} 
        className="operation-key"
      >
        ÷
      </Button>
      
      {/* Second row */}
      <Button onClick={() => dispatch(inputDigit('7'))}>7</Button>
      <Button onClick={() => dispatch(inputDigit('8'))}>8</Button>
      <Button onClick={() => dispatch(inputDigit('9'))}>9</Button>
      <Button 
        onClick={() => dispatch(performOperation('×'))} 
        className="operation-key"
      >
        ×
      </Button>
      
      {/* Third row */}
      <Button onClick={() => dispatch(inputDigit('4'))}>4</Button>
      <Button onClick={() => dispatch(inputDigit('5'))}>5</Button>
      <Button onClick={() => dispatch(inputDigit('6'))}>6</Button>
      <Button 
        onClick={() => dispatch(performOperation('-'))} 
        className="operation-key"
      >
        −
      </Button>
      
      {/* Fourth row */}
      <Button onClick={() => dispatch(inputDigit('1'))}>1</Button>
      <Button onClick={() => dispatch(inputDigit('2'))}>2</Button>
      <Button onClick={() => dispatch(inputDigit('3'))}>3</Button>
      <Button 
        onClick={() => dispatch(performOperation('+'))} 
        className="operation-key"
      >
        +
      </Button>
      
      {/* Fifth row */}
      <Button 
        onClick={() => dispatch(inputDigit('0'))} 
        className="zero-key"
      >
        0
      </Button>
      <Button onClick={() => dispatch(inputDecimal())}>.</Button>
      <Button 
        onClick={() => dispatch(calculateResult())} 
        className="operation-key"
      >
        =
      </Button>
    </div>
  );
};

export default Keypad;
