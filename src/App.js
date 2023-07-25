import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';

const Store = window.require("electron-store");
const store = new Store();

store.set("name", "syukinmei");
console.log(store.get("name"));

store.delete("name");
console.log(store.get("name"));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <Button className='c-main' type="text">Primary Button</Button>
        </div>
      </header>
    </div>
  );
}

export default App;
