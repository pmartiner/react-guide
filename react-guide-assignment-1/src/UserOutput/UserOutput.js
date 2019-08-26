import React from 'react';

const userOutput = (props) => {
    const style = {
        color: "#fgr356",
        width: "30vw",
        boxShadow: "0 2px 3px rgba(0, 0, 0, 0.2)",
        padding: "2em",
        margin: "auto",
        marginBottom: "2rem",
        marginTop: "2rem",
        borderRadius: "5px"
    };

    return (
        <div style = { style }>
            <p>Hola, { props.username }</p>
            <p>¿Cómo estás?</p>
        </div>
    );
}

export default userOutput;