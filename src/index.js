import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

//Create an Apollo client.
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

/*The ApolloProvider is similar to React's Context.Provider.
It wraps your React app and places the client on the context, which allows you to access it from anywhere in your component tree.
It should go somewhere high in your app, above any places where you need to access GraphQL data.*/
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));