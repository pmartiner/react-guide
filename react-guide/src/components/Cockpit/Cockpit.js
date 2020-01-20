import React, { useEffect, useRef, useContext } from 'react';
// useEffect() es uno de los hooks más importantes dentro de los componnentes funcionales.
// useEffect() te da la oportunidad de acceder a los cíclos de vida del componente
// cuando éste es uno funcional, pero en UN SOLO React Hook.

import AuthContext from '../../context/auth-context';

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

const Button = styled.button`
  font: inherit;
  padding: 1em;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: bold;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  display: block;
  margin-left: auto;
  margin-right: auto;

  :hover {
    box-shadow: 0 0;
  } 
`;

const ToggleButton = styled(Button)`
  background-color: ${props => props.toggled ? "#cf3434" : "#3ac961"};
  color: white;

  :hover {
    background-color: ${props => props.toggled ? "firebrick" : "mediumseagreen"};
  }  
`;

const LoginButton = styled(Button)`
  background-color: ${props => props.loggedIn ? "#c42b88" : "#044ad0"};
  color: white;

  :hover {
    background-color: ${props => props.loggedIn ? "darkmagenta" : "darkslateblue"};
  }  
`;

const Cockpit = props => {

  // useRef() es la forma de crear refs en React Hooks. Necesitamos pasarle un objeto como
  // parámetro para almacenar la info de éste, pero en este caso le pasamos uno nulo 
  const cockpitBtnRef = useRef(null);
  
  // Para llamar al context usando React Hooks también podemos hacer lo siguiente 
  // con useContext():
  const authContext = useContext(AuthContext);

  // useEffect() recibe como parámetro una función sin parámetros que se 
  // ejecutara cada vez ciclo de actualización del componente, y también recibe como
  // segundo parámetro un arreglo que se compone de todas las variables que observa, y que,
  // dada una actualización, useEffect() se ejecute con la función que definiste;
  // pero si el arreglo está vacío, la función definida dentro de useEffect() se 
  // ejecutará UNA ÚNICA vez al momento de crear el componente.
  // Si tienes más información que observar, puedes usar useEffect() varias veces.
  
  // useEffect() es componentDidMount() y componentDidUpdate() en una sola función.
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Aquí puedes insertar HTTP requests como este fake (setTimeout)
    setTimeout(() => {
      alert("Guardada la info. en la nube");
    }, 1000);

    // Tenemos que llamar al click del ref dentro de useEffect para que esta función
    // se ejecute cuando el componente está montado.
    cockpitBtnRef.current.click();

    // Cuando hay un return en useEffect(), esta función se ejecuta ANTES de la 
    // función definida en useEffect(), pero DESPUÉS del primer ciclo de rendereo
    // si el arreglo está vacío. En este caso se ejecuta el cleanup DESPUÉS de cada 
    // cambio en props.persons, pero ANTES de la función principal de useEffect(). 
    // Si no tienes un arreglo como segundo parámetro, entonces el Cleanup se ejecuta 
    // cada que se actualiza el componente, pero ANTES de la función principal.
    return () => {
      console.log("[Cockpit.js] Cleanup work.")
    };
  }, [props.persons]);
  
  let toggled = props.showPersons;
  let classes = [];
  
  if(props.personsLength <= 2){
    classes.push(styles.blue);
  }
  if(props.personsLength <= 1) {
    classes.push(styles.bold);
  }

  classes = classes.join(' ')

  let loggedInTxt = '';

  if(props.loggedIn)
    loggedInTxt = 'Log out'; 
  else
    loggedInTxt = 'Log in'
  return(
    // Para consumir el estado del AuthContext es necesario envolver al objeto en 
    // una función que lo consumirá con un ContextObj.Consumer, 
    // donde ContextObj = AuthContext en este ejemplo.
    <div>
      <header className={ styles['Cockpit-header'] }>
        <img src={logo} className={ styles['Cockpit-logo'] } alt="logo" />
        <h1 className={styles['Cockpit-title'] + ' ' + classes}>Welcome to React</h1>
      </header>
      {/* Ésta es la forma de llamar el Context sin Hooks: */}
      {/* <AuthContext.Consumer>
        {context => (
          <LoginButton 
            loggedIn={ context.loggedIn } 
            onClick={ context.loggedIn ? context.logout : context.login}
          >
            { loggedInTxt }
          </LoginButton>
          )
        }
      </AuthContext.Consumer> */}
      {/* Con Hooks podemos llamar al Context de la sig. forma:  */}
      <LoginButton 
        loggedIn={ authContext.loggedIn } 
        onClick={ authContext.loggedIn ? authContext.logout : authContext.login}
      >
        { loggedInTxt }
      </LoginButton>
      {/* Si le pones paréntesis al evento de onClick llamas a la función cuando se renderea,
          mientras que si no le pones paréntesis sólo hace una referencia al evento*/}
      <ToggleButton 
        onClick={ props.clicked } 
        ref={ cockpitBtnRef } 
        toggled={ toggled }
      >
          Toggle persons
      </ToggleButton>
    </div>
  );
}

// React.memo() toma un snapshot del component y si algo cambia en Cockpit, lo entrega.
// Su funcionalidad es similar a ShouldComponentUpdate
export default React.memo(Cockpit);