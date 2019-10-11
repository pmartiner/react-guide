import React, { Component } from 'react';
// Si quieres darle estilo a un componente, tienes que importar su CSS para que Webpack lo procese
// y lo inyecte de forma dinámica al HTML un unos <style></style>
import styles from './Person.module.css';

// Un componente sin estado puede ser una función simple, sin necesitar ser una clase
class Person extends Component {
    render() {
        return (
            // Tiene que tener un wrapper porque, en el fondo, lo que hace JSX es que aplica
            // un React.createElement() que pide un padre y los hijos que tendrá dentro
            <div className={`${styles.Person} ${this.props.className}`}>
                <p onClick={ this.props.click }>I'm { this.props.name }, and I'm { this.props.age } years old!</p>
                { this.props.children }
                <input type="text" onChange={ this.props.changeName } value={ this.props.name }/>
            </div>
        
        );
    }
}

export default Person;