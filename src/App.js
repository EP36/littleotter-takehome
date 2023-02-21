import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  const fetchData = async () => {
    try {
      const response = await fetch(`https://lo-interview.s3.us-west-2.amazonaws.com/health_sessions.json`);
      const data = await response.json();
      console.log('this is data', data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

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
      </header>
    </div>
  );
}

export default App;
