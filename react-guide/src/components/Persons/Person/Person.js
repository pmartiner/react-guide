import React, { Component } from 'react';
// import Aux from '../../HOC/Aux';
import WithClass from '../../HOC/WithClassHOC';
// Si quieres darle estilo a un componente, tienes que importar su CSS para que Webpack lo procese
// y lo inyecte de forma dinámica al HTML un unos <style></style>
import styles from './Person.module.css';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';


// Un componente sin estado puede ser una función simple, sin necesitar ser una clase
class Person extends Component {
    // Método 1 de crear refs:
    // inputRef = null;

    // Método 2 de crear refs:
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    } 

    // el contextType nos ayuda a conectar el objeto del Context API
    // con este objeto estático de tal forma que podemos accederlo en cualquier
    // parte del código sin necesidad de tener que inyectar un JSX del Context.
    // ESTO SÓLO FUNCIONA PARA LOS CLASS-BASED COMPONENTS
    static contextType = AuthContext;

    // Los prop-types sirven para marcar un error cuando el componente no recibe un prop
    // del tipo que aquí se establece
    static propTypes = {
        click: PropTypes.func,
        name: PropTypes.string,
        age: PropTypes.number,
        className: PropTypes.string,
        changeName: PropTypes.func
    }

    componentDidMount() {
        // Para llamar al contextType lo hacemos con un this.context
        console.log(this.context);
        this.inputRef.current.focus();
    }

    // componentWillUnmount() se ejecuta justo antes de eliminarse un componente del DOM.
    componentWillUnmount() {
        console.log("[Person.js] componentWillUnmount");
    }

    render() {
        return (
            // Tiene que tener un wrapper porque, en el fondo, lo que hace JSX es que aplica
            // un React.createElement() que pide un padre y los hijos que tendrá dentro
            
            // React.Fragment funciona igual que Aux: es un componente que wrappea a todos
            // sus props.children
            //<React.Fragment>
                <WithClass className={`${styles.Person} ${this.props.className}`}>
                    { this.context.loggedIn ? <p>¡Hola!</p> : <p>Please log in.</p> }
                    <p onClick={ this.props.click }>I'm { this.props.name }, and I'm { this.props.age } years old!</p>
                    { this.props.children }
                    <input
                        // Las refs sirven para hacer referencia al objeto con el cual se está interactuando.
                        // Hay 2 formas de declarar refs: como una función y una constante de la clase o en un constructor
                        // 1) Función
                        // ref = {(inputElem) => {this.inputRef = inputElem}}
                        ref={ this.inputRef }
                        type="text" 
                        onChange={ this.props.changeName } 
                        value={ this.props.name }/>
                </WithClass>
            //</React.Fragment>
        );
    }
}

export default Person;