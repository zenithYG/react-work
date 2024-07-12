import logo from './logo.svg';
import './App.css';

function App() {
  function createDatabase(key) {
    console.log(`create Database, ${key}`);
  }

  function readDatabase(key) {
    console.log(`read Database, ${key}`);
  }

  function updateDatabase(key) {
    console.log(`update Database, ${key}`);
  }

  function deleteDatabase(key) {
    console.log(`delete Database, ${key}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='button-container'>
          <button onClick={() => createDatabase("John")}>Create</button>
          <button onClick={() => readDatabase("John")}>Read</button>
          <button onClick={() => updateDatabase("John")}>Update</button>
          <button onClick={() => deleteDatabase("John")}>Delete</button>
        </div>
      </header>
    </div>
  );
}

export default App;
