import logo from './logo.svg';
import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
const Store = ConfigureStore();

function App() {
  return (
    <Provider store = {Store}>
    <BrowserRouter>
    <div>
      <Main />
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
