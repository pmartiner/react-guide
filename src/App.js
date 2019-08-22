import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  // en ES7 no necesito escribir el constructor() y su super() para inicializar
  // los atributos de la clase
  state = {
    persons: [
      {
        name: "Pablo",
        age: "24"
      },
      {
        name: "Hiromi",
        age: "17"
      }
    ]
  }

  
  // la convención de React dice que todos los métodos deben acabar con un Handler
  // cuando no lo llamas activamente, pero manejan un evento (como click, por ejemplo)
  switchNameHandler = () => {
    console.log("was clicked");

    // Si para cambiar el etado hacemos un 
    // this.state.persons[0] = "Eduardo"
    // estamos mutando al estado. ¿Por qué?
    // Porque cuando estableces al objeto de esta forma, sólo obtienes una copia del objeto
    // (aquí el estado), y no un apuntador al objeto, haciendo que se desfase la info
    // causando que deje de ser fiable y congruente la información

    // setState() funciona porque es asíncrono
    // De la documentación:
    // setState() does not immediately mutate this.state but creates a 
    // pending state transition. Accessing this.state after calling this method 
    // can potentially return the existing value. 
    // There is no guarantee of synchronous operation of calls to setState 
    // and calls may be batched for performance gains.

    this.setState({
      persons: [
        {
          name: "Eduardo",
          age: "24"
        },
        {
          name: "Mariana",
          age: "17"
        }
      ]
    });
  }

  // El DOM re-renderea el componente cada que cambia el estado
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* Si le pones paréntesis al evento de onClick llamas a la función cuando se renderea,
            mientras que si no le pones paréntesis sólo hace una referencia al evento*/}
        <button onClick={ this.switchNameHandler } >Switch name</button>
        <Person name={ this.state.persons[0].name } age={ this.state.persons[0].age }>
          <ul>
            My hobbies are:
            <li>
              Programming
            </li>
            <li>
              Gym
            </li>
          </ul>
        </Person>
        <Person name={ this.state.persons[1].name } age={ this.state.persons[1].age } />
      </div>
    );
  }
}

export default App;
