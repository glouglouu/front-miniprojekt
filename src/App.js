import './App.css';

function App() {

    const fetchApp = () => {
      fetch('http://localHost:3001')
        .then(response => response.text())
        .then(data => console.log(data))
        .catch((error => console.log(error)))
    }


  return (
    <>
    <div className="App">
      <header className="App-header">
        <button onClick={fetchApp}>Test Hello World API</button>
       </header>
    </div>
    </>
  );
}

export default App;
