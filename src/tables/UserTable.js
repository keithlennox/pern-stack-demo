import React, { useContext } from 'react'
import UserContext from '../UserContext'

/*We map through the user data we sent through as a prop and display the properties for each user,
or display a message if there are no users.*/
const UserTable = () => {

//Use the React useContext hook to retrieve the state objects from the Context API so that they're avaiable in the js file.
const { users, setUsers, editing, setEditing, currentUser, setCurrentUser } = useContext(UserContext)

//
const editRow = user => {
  setEditing(true)
  setCurrentUser({ id: user.id, name: user.name, username: user.username })
}

/*Delete user function
Triggered by the delete button displayed in each table row.
This finction accepts the id for the table row the user clicked on.
The filter() method creates a new array that contains all users in
the users state where the id matches the id of the row the user clicked on.*/
const deleteUser = id => {
  setUsers(users.filter(user => user.id !== id))
}

  /*Return statement contains JSX, which contains a table.
  We use the javascript map method to loop through the users state and display a table row for each user
  or display a message if there are no users.
  The delete button calls the deleteUser function and passes it the row id for the row clicked on.*/
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
          users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>
                <button onClick={() => {editRow(user)}} className="button muted-button">Edit</button>
                <button onClick={() => deleteUser(user.id)} className="button muted-button">Delete</button>
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