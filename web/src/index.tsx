import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';

const serverPort = 4000;

const client = new ApolloClient({
    uri: `http://localhost:${serverPort}/graphql`
})

ReactDOM.render(
    <ApolloProvider client= { client }> 
        <App /> 
    </ApolloProvider>, 
    document.getElementById('root')
);
