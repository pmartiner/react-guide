import React from 'react';
import logo from '../../assets/svg/logo.svg';
// CSS modules nos permite enfocar las classes de un archivo CSS únicamente
// a un componente al importarlo como objeto de Javascript, otorgándole
// un nombre único a esta clase.
// NOTA: para que React-scripts lo pueda entender sin modificar el Webpack,
//       el archivo CSS importado tiene que llamarse xxxx.modules.css A FUERZA
import styles from '../../assets/stylesheets/Cockpit.module.css';
import styled from 'styled-components';

// Styled-components nos permite hacer CSS en línea dedicado únicamente a un componente.
// Styled-components crea un componente con un estilo establecido por el usuario, y 
// puede replicar este estilo si es usado como una constante. 
// También recibe props y también le puede heredar los estilos a otro componente 
// (como en StyledPerson)
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

const Cockpit = props => {

    let toggled = props.showPersons;
    let classes = [];
    
    if(props.persons.length <= 2){
      classes.push(styles.blue);
    }
    if(props.persons.length <= 1) {
      classes.push(styles.bold);
    }

    classes = classes.join(' ')
    
    return(
        <div>
            <header className={ styles['Cockpit-header'] }>
                <img src={logo} className={ styles['Cockpit-logo'] } alt="logo" />
                <h1 className={styles['Cockpit-title'] + ' ' + classes}>Welcome to React</h1>
            </header>
            {/* Si le pones paréntesis al evento de onClick llamas a la función cuando se renderea,
                mientras que si no le pones paréntesis sólo hace una referencia al evento*/}
            <ToggleButton onClick={ props.clicked } toggled={ toggled }>Toggle persons</ToggleButton>
        </div>
        
        
    );
}

export default Cockpit;