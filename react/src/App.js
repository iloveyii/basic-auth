import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './Table';

class App extends React.Component {

  render() {

    return (
        <div className="App">
          <header className="App-header">
            <h1>Lab 02</h1>
          </header>
          <Table />
        </div>
    );
  }

}

export default App;
