import React from 'react';
import './App.scss';
import ProductPage from './pages/ProductPage/ProductPage';
import { render } from 'react-dom';

export default class App extends React.Component {
  render() {
    return (
      <ProductPage productId={357375279141}/>
    );
  }
}

/*const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */
