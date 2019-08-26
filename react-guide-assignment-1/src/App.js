import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {

  state = {
    username: "Pablo"
  }

  switchUsernameHandler = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  render() {
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
        <section>
          <UserInput username={ this.state.username } changeUser={ this.switchUsernameHandler }/>
          <UserOutput username={ this.state.username }/>
          <UserOutput username={ this.state.username }/>
          <UserOutput username={ this.state.username }/>
        </section>
      </div>
    );
  }
  
}

export default App;
