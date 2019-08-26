import React from 'react';
import './UserInput.css';

const userInput = (props) => {
    return (
        <div className="UserInput">
            <label htmlFor='#userInput'>Introduzca su texto: </label>
            <input id='userInput' type='text' value={ props.username } onChange={ props.changeUser }/>  
        </div>     
    );
}

export default userInput;