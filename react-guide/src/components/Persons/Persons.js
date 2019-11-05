// Por defecto, Component no integra una validación shouldComponentUpdate(),
// sino que tú la tienes que agregar.
// import React, { Component } from 'react';

// Sin embargo, un PureComponent ya tiene integrado un shouldComponentUpdate(), 
// PERO no es personalizable: checa cada prop dentro del render y lo compara con el actual
// para que, si algún prop dentro de la función render cambia, entonces el PureComponent 
// se rerenderee. Si no hay cambios en ningún prop que está dentro de render, 
// el PureComponent no se rerenderea
import React, { PureComponent } from 'react';

import Person from './Person/Person';
import styled from 'styled-components';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

// En ES6 si omites las llaves en una arrow func. y sólo pones unos paréntesis,
// lo que significa es que regresará automáticamente todo lo del paréntesis, es decir,
// puedes omitir return(), porque lo de adentro del paréntesis 
// es lo que va a regresar la función.

const StyledPerson = styled(Person)`
  @media (max-width: 500px) {
    width: 75vw;
  }
`;

class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log("[Persons.js] getDerivedStateFromProps")

  //   return state;
  // }

  // componentWillReceiveProps(props) {
  //   console.log("[Persons.js] componenteWillReceiveProps", props);
  // }

  // shouldComponentUpdate() ahora previene que se re-renderee si su componente "wrapper"
  // cambia, a menos de que se cumplan estas condiciones
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[Persons.js] shouldComponentUpdate");
  //   if(nextProps.persons !== this.props.persons)
  //     return true;
  //   else
  //     return false;
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate");

    return { message: "Snapshot!" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Persons.js] componentDidUpdate");
    console.log(snapshot);
  }

  render() {
    const persons = this.props.persons.map((person, i) => {
      console.log("[Persons.js] rendering...")
        // Los Error Boundaries son Higher Order Components (que envuelven a otros componentes)
        // Éstos SÓLO se deben usar cuando hay errores que se pueden generar y no dependen del
        // desarrollador. Lo que hacen los Boundaries es mostrar un error personalizado en 
        // producción.

        // Las keys siempre deben de ir en el componente de "hasta fuera"
        return <ErrorBoundary key={person.id}>
                  <StyledPerson 
                        name={ person.name } 
                        age={ person.age } 
                        click={ () => this.props.clicked(i) }
                        // Aquí le pones en la función anónima el event porque, al ser lo que se ejecutará
                        // cuando hay un evento (onChange), entonces es quien realmente recibe el parámetro event.
                        changeName={ (event) => this.props.changed(event, person.id) }                       
                      /> 
               </ErrorBoundary>
      })

    return <div>{ persons }</div>;
  }
    
}

export default Persons;