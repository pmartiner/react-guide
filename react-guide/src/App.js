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
  switchNameHandler = (newName) => {
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
          name: newName[0],
          age: "24"
        },
        {
          name: newName[1],
          age: "17"
        }
      ]
    });
  }

  inputNameHandler = (event) => {
    // El event siempre se genera cuando hay interacción con algún elemento del DOM.
    // Los event (a veces conocidos como el parámetro e) siempre tienen una propiedad llamada target.
    // Dependiendo del target, puede tener un valor de value.

    this.setState({
      persons: [
        {
          // En este caso, el event.target hace referencia al input que está llamando a la función en su
          // onChange().
          name: event.target.value,
          age: "24"
        },
        {
          name: event.target.value,
          age: "19"
        }
      ]
    });
  }

  // El DOM re-renderea el componente cada que cambia el estado
  render() {

    // Para darle estilos inline a tus elementos lo haces a través de JS con objetos y propiedades hechas
    // para JS.
    const style = {
      backgroundColor: "#3776ad",
      font: "inherit",
      padding: "1em",
      marginTop: "1rem",
      marginBottom: "1rem",
      color: "white",
      border: "solid 1px #4c7ca6",
      borderRadius: "5px",
      cursor: "pointer",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)"
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* Si le pones paréntesis al evento de onClick llamas a la función cuando se renderea,
            mientras que si no le pones paréntesis sólo hace una referencia al evento*/}
        <button style={ style } onClick={ this.switchNameHandler.bind(this, ["Pablo", "Hiromi"]) } >Switch name</button>
        {/* Puedes pasar métodos a otros elementos a través de props. Por ejemplo: click={ this.switchNameHandler }
        
            Cuando haces un this.switchName.bind(this), lo que dices es que al primer this (elemento que
            contiene la función switchNameHandler), le vas a bindear otro this, que recibirá como parámetro.
            Éste segundo this proviene de la función y se referirá a la clase, no al objeto.
            
            Cuando le pasas un segundo argumento (o más), le mandas el parámetro (o más, si hay) 
            de la función al objeto sin estado. Por ejemplo: 
            click = { this.switchNameHandler(this, newName[]) } 
            
            Ésta es la forma recomendada (la función anónima es ineficiente)*/}
        <Person 
          name={ this.state.persons[0].name } 
          age={ this.state.persons[0].age } 
          click={ this.switchNameHandler.bind(this, ["Eduardo", "Mariana"]) }
          changeName={ this.inputNameHandler } 
        >
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
        {/* Otra forma de mandar parámetros a través de métodos en props es con las arrow functions.
            En las props, cuando usas una arrow function, siempre recives un event (e) aunque no tenga
            parámetros la función, pues siempre puedes interactuar con los elementos del DOM. Si quieres
            usarlo, tienes que hacer una declaración explícita del parámetro (ver inputNameHandler(event)).
            
            Cuando usas una arrow function (como aquí abajo), implícitamente lo siguiente a la flecha
            es un return si están en la misma línea. Por ejemplo:
            () => this.switchNameHandler(newName[]) es lo mismo que () => return this.switchNameHandler(newName[]) 
            
            Si quisieras que no estuviera en una misma línea, la alternativa es escribir el cuerpo de la 
            función entre llaves {}, después de la flecha. Por ejemplo: 
            () => { this.switchNameHandler(newName[]) } 
            
            Si le pasas una función anónima al prop, la ejecuta hasta que sucede el evento, a diferencia
            de sólo mandarle la función pero con paréntesis.
            () => this.switchNameHandler() != this.switchNameHandler() */}
        <Person 
          name={ this.state.persons[1].name } 
          age={ this.state.persons[1].age } 
          click={ () => this.switchNameHandler(["Pablo", "Hiromi"]) }
          changeName={ this.inputNameHandler }
        />
      </div>
    );
  }
}

export default App;
