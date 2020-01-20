import React from 'react';

// Aquí creamos un Context Object del Context API de React.
// Para lo que sirve el Context es para pasar un estado "global"
// entre diferentes partes de la aplicación sin necesidad de
// estar pasando entre componentes el estado o los props.
// No importa el valor por defecto que tenga cada key, pues
// cambiará
const authContext = React.createContext({
    loggedIn: false,
    login: () => {},
    logout: () => {}
});

export default authContext;