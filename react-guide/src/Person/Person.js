import React from 'react';
// Si quieres darle estilo a un componente, tienes que importar su CSS para que Webpack lo procese
// y lo inyecte de forma dinámica al HTML un unos <style></style>
import './Person.css';

// Un componente sin estado puede ser una función simple, sin necesitar ser una clase
const person = (props) => {
    return (
        // Tiene que tener un wrapper porque, en el fondo, lo que hace JSX es que aplica
        // un React.createElement() que pide un padre y los hijos que tendrá dentro
        <div className="Person">
            <p onClick={ props.click }>I'm { props.name }, and I'm { props.age } years old!</p>
            { props.children }
            <input type="text" onChange={ props.changeName } value={ props.name }/>
        </div>
        
    );
}

export default person;