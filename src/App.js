import React, { Component, Fragment } from 'react';
import 'react-rangeslider/lib/index.css';
import './App.css';
import Consumer, { AppContextProvider } from './AppContext';
import MainPage from './MainPage';

class App extends Component {

  render() {
    return (
        <AppContextProvider>
          <Consumer>
            {context => <MainPage context={context}/>}
          </Consumer>
        </AppContextProvider>
    );
  }
}

export default App;
