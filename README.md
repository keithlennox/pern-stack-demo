# CRUD Demo

A simple CRUD app that can add, update, or delete users.

## Frontend
React  
State management is handled by React hooks (useState, useEffect, useContext) + context API.   
Navigation: conditional rendering
Connect to backend: Apollo

## Backend
Backend: node.js  
Web server: express / graphQL
Connect backend to db: postgraphile

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

## Postgres
