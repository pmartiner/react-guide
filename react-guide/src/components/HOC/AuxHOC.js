import React from 'react';

// El concepto de los Higher Order Componentes (HOC) es un componente que envuelve
// a los demśa y, además, les agrega algo: estilos, estructuras HTML adicionales, lógica, etc.


// props.children = todo los elementos que están entre el tag de apertura 
// y de cierre de Aux
const aux = props => props.children;

export default aux;
