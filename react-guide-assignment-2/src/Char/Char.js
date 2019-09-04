import React from 'react';
import './Char.css';

const char = (props) => {
    return(
        <div className="Char" onClick={ props.delete }>
            { props.char }
        </div>
    );    
} 

export default char;