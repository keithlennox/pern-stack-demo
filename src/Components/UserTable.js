import React, { useContext } from 'react'
import UserContext from '../UserContext'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_USERS_QUERY } from '../GraphQL'
import { DELETE_USER_MUTATION } from '../GraphQL'

//React UserTable functional component
const UserTable = () => {

  //Use the React useContext hook to retrieve the state objects from the Context API so that they're avaiable in this js file.
  const { user, setUser, users, setUsers, editing, setEditing } = useContext(UserContext)

  /*Call postgreSQL database to get all users using useQuery hook provided by Apollo.
  The useQuery hook accepts the query as a first argument and returns an object with
  three properties data, loading and error.
  We use object destructuring to get these three properties.
  data : It contains the data which comes back from our graphql api.
  loading : The loading property is true when the query is still in process.
  error: The error property contains error-related data.*/
  const { loading: getUserLoading, error: getUserError, data } = useQuery(GET_USERS_QUERY);

  //Call postgreSQL database to delete user using useMutation hook provided by Apollo.
  const [deleteExistingUser, { loading: deleteUserLoading, error: deleteUserError }] = useMutation(
  DELETE_USER_MUTATION, 
  {refetchQueries: [{ query: GET_USERS_QUERY }]}
  );

  //Handle results of API call to get all users
  if (getUserLoading) { //Display loading message until results are back.
    return (
      <p>Loading...</p> 
    )
  }
  if (getUserError) { //Display error message if there was an error.
    return (<p>Error: cannot get users</p>)
  }
  setUsers(data.allUsers.nodes) //If results are back error free, update the user state with with database data.

  /*Handle results of API call to get all users
  Notice the short form way of handling the if statements.
  I think we should find a way to display these mesaages 
  without disabling the entire list of users*/
  if (deleteUserLoading) return <p>Processing...</p>;
  if (deleteUserError) return <p>Error: user could not be deleted</p>;
  
  /*Get table row function
  Triggered when the edit button in a table row is clicked,
  which sends the table row data as a paramter to this function.
  Turns on edit mode, which displays the user edit form.
  Sets the the user state to the the current table row, and as a result the
  current user data is displayed in the form fields.*/
  const getTableRow = tableRow => {
    setEditing(true)
    setUser({ id: tableRow.id, name: tableRow.name, username: tableRow.username })
  }

  /*Delete user function
  Triggered when the delete button in a table row is clicked.
  This function accepts the id for the table row the user clicked on.
  The filter() method creates a new array that contains all users in
  the users state where the id matches the id of the row the user clicked on.*/
  const deleteUser = id => {
    console.log(id)
    setEditing(false)
    deleteExistingUser( {variables: { id: id } } ) //Delete user from database
    setUsers(users.filter(user => user.id !== id)) //Delete user from Users state
    setUser({ id: null, name: '', username: '' }) //Re-set user state to empty
  }

  /*Return statement (JSX) contains a table.
  We use the javascript map() method to loop through the users state and display a table row for each user.
  Or display a message if there are no users.
  The edit button calls the getTableRow function and passes it the current table row.
  The delete button calls the deleteUser function and passes it the row id for the row clicked on.
  */
  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map(tableRow => (
            <tr key={tableRow.id}>
              <td>{tableRow.name}</td>
              <td>{tableRow.username}</td>
              <td>
                <button onClick={() => {getTableRow(tableRow)}} className="button muted-button">Edit</button>
                <button onClick={() => deleteUser(tableRow.id)} className="button muted-button">Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No users</td>
          </tr>
        )}
      </tbody>
    </table>
    );
}

export default UserTable