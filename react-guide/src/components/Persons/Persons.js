import React from 'react';
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

const Persons = props => (
    props.persons.map((person, i) => {
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
                        click={ () => props.clicked(i) }
                        // Aquí le pones en la función anónima el event porque, al ser lo que se ejecutará
                        // cuando hay un evento (onChange), entonces es quien realmente recibe el parámetro event.
                        changeName={ (event) => props.changed(event, person.id) }                       
                      /> 
               </ErrorBoundary>
      })
);

export default Persons;