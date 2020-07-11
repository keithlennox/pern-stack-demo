/*This file contains all GraphQL queries and mutations.*/

import { gql } from 'apollo-boost' //Allows us to parse GraphQL queries.

//Create graphQL query string
export const GET_USERS_QUERY = gql`
  query GetUsers {
    __typename
    allUsers {
      nodes {
        id
        name
        username
      }
    }
  }
`

//Create graphQL mutation string that adds user
export const ADD_USER_MUTATION = gql`
  mutation addUser($name: String!, $username: String!) {
      createUser(
        input: {
          user: {
            name: $name,
            username: $username
          }
        }
      )
    {
      clientMutationId
      }
    }
  `

//Create graphQL mutation string that deletes user
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: Int!, $name: String!, $username: String!) {
    __typename
    updateUserById(input: {userPatch: {name: $name, username: $username}, id: $id}) {
      clientMutationId
    }
  }
`

//Create graphQL mutation string that deletes user
export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: Int!) {
    __typename
    deleteUserById(input: {id: $id}) {
      clientMutationId
      deletedUserId
    }
  }
`