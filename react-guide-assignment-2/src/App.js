import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  state = {
    inputText: ''
  }

  writeHandler = (event) => {
    this.setState({
      inputText: event.target.value
    });
  }

  deleteCharHandler = (i) => {
    let inputText = [...this.state.inputText];

    inputText.splice(i, 1); 
    inputText = inputText.join('');
    this.setState({
      inputText: inputText 
    });
  }

  render() {
    let inputText = [...this.state.inputText];
    let charList = null;

    if(inputText.length > 0)
      charList = inputText.map((char, i) => {
        return <Char char={ char } key={char + i} delete={ this.deleteCharHandler.bind(this, i) }/>
      }) 

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
          <div>
            { charList }
            <Validation textLength={ this.state.inputText.length } /> 
            <label htmlFor="input">Introduce un texto: </label>
            <textarea id="input" name="string" value={ this.state.inputText } onChange={ this.writeHandler } />
            <p>{ this.state.inputText }</p>      
          </div>
          
        </section>
      </div>
    );
  }
}

export default App;
