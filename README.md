# PERN Stack Demo

A simple PERN stack (postgres, express, react, node) application that uses postgraphile in the backend to automatically generate a GraphQL API. CRUD operations permit adding, updating or deleting users in a PostgreSQL database.  

## Frontend
React  
State management: React hooks (useState, useEffect, useContext) + context API.    
GraphQL requests: Apollo Client  

## Backend
node.js  
Web server: express / postgraphile  

## Database
PostgreSQL  
 

Use the following commands to create the database required for this demo:

CREATE DATABASE users;  
CREATE TABLE users ( id SERIAL PRIMARY KEY, name VARCHAR(20), username VARCHAR(20) );  

### The following tutorials were used:

## CRUD
https://www.taniarascia.com/crud-app-in-react-with-hooks/

## Hooks + Context API
https://www.taniarascia.com/using-context-api-in-react/  

## Apollo
https://www.apollographql.com/docs/react/get-started/  
https://reactgo.com/react-hooks-apollo/

## Postgraphile
https://www.graphile.org/postgraphile/quick-start-guide/