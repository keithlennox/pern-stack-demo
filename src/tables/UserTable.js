import React, { useContext } from 'react'
import UserContext from '../UserContext'

/*Functional component that takes props as paremeter.
We'll map through the user data we sent through as a prop and display the properties for each user,
or display a message if there are no users.
*/
const UserTable = () => {

const { users, setUsers, editing, setEditing, currentUser, setCurrentUser } = useContext(UserContext)

//
const editRow = user => {
  setEditing(true)
  setCurrentUser({ id: user.id, name: user.name, username: user.username })
}

//Delete user function
const deleteUser = id => {
  setUsers(users.filter(user => user.id !== id))
}

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