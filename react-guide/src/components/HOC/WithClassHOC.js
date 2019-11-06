import React from 'react';

// El concepto de los Higher Order Componentes (HOC) es un componente que envuelve
// a los demśa y, además, les agrega algo: estilos, estructuras HTML adicionales, lógica, etc.


// FORMA 1 de crear HOC 
// Un componente funcional

const withClass = props => (
    <div className={ props.className }>
        { props.children }
    </div>
);

export default withClass;