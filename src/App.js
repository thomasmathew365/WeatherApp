import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  async componentWillMount() {
    var fetchedData = await fetch(`/getData`);
    var data = await fetchedData.json()
    console.log(data);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ajsacnckjsnskjn to React</h1>
        </header>``
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
