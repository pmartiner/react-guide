import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';
import styled, { css } from 'styled-components';

const ToggleButton = styled.button`
  background-color: ${props => props.toggled ? "#cf3434" : "#3ac961"};
  font: inherit;
  padding: 1em;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: bold;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  :hover {
    background-color: ${props => props.toggled ? "firebrick" : "mediumseagreen"};;
    box-shadow: 0 0;
  }  
`;

const StyledPerson = styled(Person)`
  @media (min-width: 500px) {
    width: 25vw;
  }
`;

class App extends Component {
  // en ES7 no necesito escribir el constructor() y su super() para inicializar
  // los atributos de la clase
  state = {
    persons: [
      {
        id: 123,
        name: "Pablo",
        age: "24"
      },
      {
        id: 'fgd',
        name: "Hiromi",
        age: "17"
      }
    ],
    showPersons: true
  }

  
  // La convención de React dice que todos los métodos deben acabar con un Handler
  // cuando no lo llamas activamente, pero manejan un evento (como click, por ejemplo)
  /* switchNameHandler = (newName) => {
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
  } */

  deletePersonHandler = (i) => {
    // En Javascrpit, cuando asignas en una variable a un array o un objeto, sólo apuntas hacia ellos,
    // no copias realmente el valor de éstos (reference types). 
    // Para evitar eso, haces uso del slice() (porque es un arreglo). Así recibes una copia del arreglo y
    // no una referencia. Lo mismo con el spread operator.

    //const persons = this.state.persons.slice();

    // Haciendo uso de ES6, en lugar de usar slice(), puedes hacer uso del spread [...arreglo] operator.
    // Este operador copia todos los elementos de una arreglo y los une a otros.
    const persons = [...this.state.persons];

    // Si mantienes la igualdad al arreglo de personas del estado y lo cambias, estás mutándolo 
    // y lo vuelves desconfiable e inestable. Con el slice() o con [...arreglo] lo puedes modificar 
    // a tu gusto porque es una copia del arreglo y no una referencia a éste.
    persons.splice(i, 1);

    this.setState({
      persons: persons
    });
  }

  inputNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });

    // El event siempre se genera cuando hay interacción con algún elemento del DOM.
    // Los event (a veces conocidos como el parámetro e) siempre tienen una propiedad llamada target.
    // Dependiendo del target, puede tener un valor de value.

    // Como cada persona es un objeto y lo modificaremos, usamos el spread operator
    const person = {
      ...this.state.persons[personIndex]
    };

    
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }


  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  // El DOM re-renderea el componente cada que cambia el estado
  render() {

    // Para darle estilos inline a tus elementos lo haces a través de JS con objetos y propiedades hechas
    // para JS.
    

    let persons = null;
    let toggled = this.state.showPersons;

    if(this.state.showPersons) {
      // Cada que haces una lista [map()], necesitas pasarle al atributo que será rendereado una key
      // para que React pueda hacer una comparación con el DOM actual contra el pasado para saber qué
      // hacer en su virtualDOM cuando hay listas.
      // El key TIENE que ser un valor único, por ejemplo, el ID de una BD.
      persons = (
        <div>
          { this.state.persons.map((person, i) => {
            return <StyledPerson 
                    name={ person.name } 
                    age={ person.age } 
                    click={ () => this.deletePersonHandler(i) }
                    // Aquí le pones en la función anónima el event porque, al ser lo que se ejecutará
                    // cuando hay un evento (onChange), entonces es quien realmente recibe el parámetro event.
                    changeName={ (event) => this.inputNameHandler(event, person.id) } 
                    key={person.id}
                  />
          }) }
        </div>
      );

    }

    let classes = [];
    
    if(this.state.persons.length <= 2){
      classes.push('blue');
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }

    classes = classes.join(' ')

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className={"App-title " + classes}>Welcome to React</h1>
        </header>
        {/* Si le pones paréntesis al evento de onClick llamas a la función cuando se renderea,
            mientras que si no le pones paréntesis sólo hace una referencia al evento*/}
        <ToggleButton onClick={ this.togglePersonsHandler } toggled={ toggled }>Toggle persons</ToggleButton>
        
          {/* Entre llaves se puede escribir JS, no solo elementos HTML-JSX */}

          {/* JSX sólo acepta condicionales en forma ternaria entre llaves dentro del return del render():
              condición ? verdadero : falso 
              
              En este caso, cuando es verdadero, pinta todo lo que está dentro del div.
              Si es falso, no pinta nada (ver final del div) 
              
              Se llama React.createElement() si la condición es verdadera usando al 
              div como padre */}
          
        <div>
          {/* Puedes pasar métodos a otros elementos a través de props. Por ejemplo: click={ this.switchNameHandler }
      
              Cuando haces un this.switchName.bind(this), lo que dices es que al primer this (elemento que
              contiene la función switchNameHandler), le vas a bindear otro this, que recibirá como parámetro.
              Éste segundo this proviene de la función y se referirá a la clase, no al objeto.
              
              Cuando le pasas un segundo argumento (o más), le mandas el parámetro (o más, si hay) 
              de la función al objeto sin estado. Por ejemplo: 
              click = { this.switchNameHandler(this, newName[]) } 
              
              Ésta es la forma recomendada (la función anónima es ineficiente)*/}

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

          { persons }
        </div>      
      </div>
    );
  }
}

export default App;
