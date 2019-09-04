import React from 'react';

const validation = (props) => {
    let restriction;

    if(props.textLength < 30) 
        restriction = 'Tu texto está muy corto. Debe contener por lo menos 30 caracteres';   
    else if(props.textLength > 150)
        restriction = 'Tu texto está demasiado largo. Máximo debe contener 150 caracteres';
    else
        restriction = 'Tu texto tiene la longitud suficiente';

    return(
        <div>
            <p>{ restriction }</p>
            <p>Longitud actual del texto: { props.textLength } caracteres </p>
        </div>
    );
}

export default validation;