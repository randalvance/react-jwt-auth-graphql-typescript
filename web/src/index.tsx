import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Routes } from './Routes';
import { getAccessToken } from './accessToken';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
    request: (operation) => {
        const accessToken = getAccessToken();
        operation.setContext({
            headers: {
                authorization: accessToken ? `Bearer ${accessToken}` : '',
            }
        })
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>,
    document.getElementById('root'));
