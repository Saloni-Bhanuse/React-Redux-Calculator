
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Calculator from './components/Calculator'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Calculator />
      </div>
    </Provider>
  )
}

export default App
