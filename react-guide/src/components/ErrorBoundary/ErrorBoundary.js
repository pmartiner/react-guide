import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({
            hasError: true,
            errorMessage: error
        })
    }

    render() {
        let errorMsg = this.props.children;

        if(this.state.hasError){
            errorMsg = this.state.errorMessage;
        }
        return (
            <div>{ errorMsg }</div>
        );
    }
}

export default ErrorBoundary;