import './App.css';
import General from './view/General'
import { Provider } from 'react-redux'
import generateStore from "./redux/store";

const store = generateStore();

function App() {
  return (
    <Provider store={store}>
      <General />
    </Provider>
  );
}

export default App;
