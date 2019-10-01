import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Routes } from './Routes';

const serverPort = 4000;

const client = new ApolloClient({
    uri: `http://localhost:${serverPort}/graphql`
})

ReactDOM.render(
    <ApolloProvider client= { client }> 
        <Routes /> 
    </ApolloProvider>, 
    document.getElementById('root')
);
