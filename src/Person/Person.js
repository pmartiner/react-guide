import React from 'react';

// Un componente sin estado puede ser una función simple, sin necesitar ser una clase
const person = (props) => {
    return (
        <div>
            <p>I'm { props.name }, and I'm { props.age } years old!</p>
            { props.children }
        </div>
        
    );
}

export default person;