import React, { useState } from 'react'
import UserTable from './tables/UserTable'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import { UserProvider } from './UserContext'

const App = () => {

  //Create dummy data (to be replaced with db)
  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' },
  ]

  //Create empty form values for the update user form
  const initialFormState = { id: null, name: '', username: '' }

  //Create state
  const [users, setUsers] = useState(usersData)//Create users state and populate with dummy data
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [editing, setEditing] = useState(false)//Create editing state. Indicates if form is in update or create mode.

  //Return JSX
  return (
    <UserProvider value={{ users, setUsers, editing, setEditing, currentUser, setCurrentUser }} >
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable />
        </div>
      </div>
    </div>
    </UserProvider>
  )
}

export default App