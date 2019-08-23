import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';


// Vamos a reescribir la clase App como un componente funcional con estado
// haciendo uso de React Hooks

const app = props => {

  // La función useState() siempre regresa 2 elementos en un arreglo:
  // [0]: El objeto con el estado 
  // [1]: Una función que nos permite actualizar el estado (como lo hace setState()),
  //      PERO esta función, en lugar de actualizar sólo las llaves seleccionadas del
  //      objeto, sustituye al estado por el que le pasas a la función.
  //      Es decir, si tuviera {persons: ..., otro: ...} y usara la función (aquí)
  //      setPersonState({ persons: ... }), el nuevo estado del componente funcional estaría
  //      ÚNICAMENTE constituido por {persons: ...}
  const [personState, setPersonState] = useState({
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
  });

  // Se pueden tener funciones dentro de funciones en JS como variables o sin variables
  
  // La forma más elegante de hacer un merge en tu estado en un componete funcional,
  // y no tener que agregar llave por llave a éste, podemos usar useState() para generar
  // "otro" estado en un objeto funcional para que React una estos 2 "estados" en uno solo

  const [otroState, setOtroState] = useState("Hola");

  const switchNameHandler = () => {
    /* Aquí ya no usamos el setState() porque estamos usando React Hooks al usar useState().
       Entonces, sólo invocamos a la variable que recibe la función para actualizar el
       estado de la función*/
    /* A setPersonState le tengo que pasar todo el objeto del estado, porque si no, al ser
       una función que sustituye todo el estado (y no hace merge), la llave "otro" se
       perdería. Peeeero, hay una forma más elegante de hacerlo (ver arriba) */
    setPersonState({
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
  
  console.log(personState, otroState);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      {/* Si le pones paréntesis al evento de onClick llamas a la función cuando se renderea,
          mientras que si no le pones paréntesis sólo hace una referencia al evento*/}
      {/* Como aquí el componente no es una clase, sino una función, 
          no es necesario hablar del "this" */}
      <button onClick={ switchNameHandler } >Switch name</button>
      <Person 
        name={ personState.persons[0].name } 
        age={ personState.persons[0].age }>
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
      <Person 
        name={ personState.persons[1].name } 
        age={ personState.persons[1].age } 
        click={ switchNameHandler }/>
    </div>
  );
}

export default app;
