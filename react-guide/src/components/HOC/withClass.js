import React from 'react';

// El concepto de los Higher Order Componentes (HOC) es un componente que envuelve
// a los demśa y, además, les agrega algo: estilos, estructuras HTML adicionales, lógica, etc.

// FORMA 2 de crear HOC 
// Una función que regresa una función

const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={ className }>
            <WrappedComponent/>
        </div>
    );
};

export default withClass;