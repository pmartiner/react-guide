import React, { Component } from 'react';
// import Aux from '../../HOC/Aux';
import WithClass from '../../HOC/WithClassHOC';
// Si quieres darle estilo a un componente, tienes que importar su CSS para que Webpack lo procese
// y lo inyecte de forma dinámica al HTML un unos <style></style>
import styles from './Person.module.css';

// Un componente sin estado puede ser una función simple, sin necesitar ser una clase
class Person extends Component {
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
                    <p onClick={ this.props.click }>I'm { this.props.name }, and I'm { this.props.age } years old!</p>
                    { this.props.children }
                    <input type="text" onChange={ this.props.changeName } value={ this.props.name }/>
                </WithClass>
            //</React.Fragment>
        );
    }
}

export default Person;