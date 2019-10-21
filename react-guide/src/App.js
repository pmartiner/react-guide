import React, { Component } from 'react';
import Persons from './components/Persons/Persons';
import Cockpit from './components/Cockpit/Cockpit';
import styles from './assets/stylesheets/App.module.css';

// App se vuelve el container de Cockpit y de Persons; esto significa que App
// únicamente se encargará de los handlers y de modificar el estado, mientras
// que sólo rendeará los componentes con los props dados, sin enfocarse en el estilo
// del UI.

// Separamos los componentes en containers y en presentational components para que el
// flujo sea más predecible y sepamos dónde se está cambiando el estado, si cambia.
// Utilizamos los presentational components (stateless) para renderear la UI, no para 
// manejar la lógica de la aplicación.

// Los class-based components tienen Lifecycle hooks quue son funciones que 
// se ejecutan cada vez que el componente se crea o que se rerenderea.

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
    // this.state = {
    //   persons: [
    //     {
    //       id: 123,
    //       name: "Pablo",
    //       age: "24"
    //     },
    //     {
    //       id: 'fgd',
    //       name: "Hiromi",
    //       age: "17"
    //     }
    //   ],
    //   showPersons: true
    // }
  }


  // en ES7 no necesito escribir el constructor(props) y su super(props) para inicializar
  // los atributos de la clase junto con sus props.
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

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");

    return true;
  }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
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
    

    if(this.state.showPersons) {
      // Cada que haces una lista [map()], necesitas pasarle al atributo que será rendereado una key
      // para que React pueda hacer una comparación con el DOM actual contra el pasado para saber qué
      // hacer en su virtualDOM cuando hay listas.
      // El key TIENE que ser un valor único, por ejemplo, el ID de una BD.
      persons = <Persons 
                  persons={ this.state.persons } 
                  clicked={ this.deletePersonHandler } 
                  changed = { this.inputNameHandler }
                />;
    }

    
    console.log("[App.js] rendering...");

    return (
      <div className={ styles.App }>

        <Cockpit persons={ this.state.persons } clicked={ this.togglePersonsHandler } showPersons = { this.state.showPersons }/>
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
