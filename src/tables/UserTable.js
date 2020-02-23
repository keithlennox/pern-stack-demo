import React, { useContext } from 'react'
import UserContext from '../UserContext'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

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

//React UserTable functional component
const UserTable = () => {

  //Use the React useContext hook to retrieve the state objects from the Context API so that they're avaiable in this js file.
  const { user, setUser, users, setUsers, editing, setEditing } = useContext(UserContext)

  //Call postgreSQL database to get all users using useQuery hook provided by Apollo.
  const { loading, error, data } = useQuery(GET_USER_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data)
  setUsers(data.allUsers.nodes) //Updates the user state with with database data.

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
  This finction accepts the id for the table row the user clicked on.
  The filter() method creates a new array that contains all users in
  the users state where the id matches the id of the row the user clicked on.*/
  const deleteUser = id => {
    setEditing(false)
    setUsers(users.filter(user => user.id !== id))
    setUser({ id: null, name: '', username: '' })
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