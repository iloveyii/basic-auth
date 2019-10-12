import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';

class App extends React.Component {

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <h1>Lab 02</h1>
                </header>
                <Login/>
            </div>
        );
    }

}

export default App;
