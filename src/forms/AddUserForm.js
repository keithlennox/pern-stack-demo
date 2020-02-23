import React, { useState, useContext } from 'react'
import UserContext from '../UserContext'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

//Create graphQL query string
const GET_USER_QUERY = gql`
  {
    allUsers {
      nodes {
        id
        name
        username
      }
    }
  }
`

//Create graphQL mutation string
const ADD_USER_MUTATION = gql`
  mutation myMutation($name: String!, $username: String!) {
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

//React AddUserForm functional component
const AddUserForm = () => {

  //Use the React useContext hook to retrieve the state objects from the Context API so that they're avaiable in the js file.
  const { user, setUser, users, setUsers, editing, setEditing } = useContext(UserContext)

  /*Call postgreSQL database to create new user using useMutation hook provided by Apollo.
  If you leave out {refetchQueries: [{ query: GET_USER_QUERY }]}, the database update still
  works, but you have to refresh the browser for the change to show up on the web page.
  The useMutation hook returns a function that you need to call in order to actually make 
  the update to the database. We call this when the "Add new user" button is clicked.
  The useMutation function also returns loading and error values.*/
  const [addNewUser, { loading, error }] = useMutation(ADD_USER_MUTATION, {refetchQueries: [{ query: GET_USER_QUERY }]});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  /*Handle change function
  Called whenever the form field values change.*/
  const handleChange = event => { //The event object contains the name and value for whichever form field triggered this function (by being updated).
    const { name, value } = event.target //Object destructuring is used to get the name and value from the event object.
    setUser({ ...user, [name]: value }) //The spread operator is used to add the name and value to the local user state.
  }

  /*Add user function
  Called when the form is submitted.*/
  const addUser = user => { //Takes the user state as a parameter.
    user.id = users.length + 1 //Increment the user id, eventually this would be handled automatically by the posgreSQL db.
    addNewUser( {variables: { name: user.name, username: user.username } } ) //This adds new user to database
    setUsers([...users, user]) //The spread operator is used to add the user state to the users state.
    setUser({ id: null, name: '', username: '' }) //The user state is re-set back to empty values.
  }

  /*Return statement (JSX) contains the add user form.
  The input tags contain an onChange event handler that calls the handleChange function
  any time the contents of the form fields are updated. The handleChange function updates the user state 
  with the new value entered into the form field.
  The input tag's "value" attributes display the user state so that the form field updates and
  displays whatever is typed into the field.
  The form tag contains an onSubmit function, and we prevent the default form submission from firing.
  A small bit of validation makes sure empty values cannot be submitted.
  We call the addUser function and pass it the user state.*/
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        if (!user.name || !user.username) return
        addUser(user)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleChange} />
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleChange} />
      <button>Add new user</button>
    </form>
  )
}

export default AddUserForm