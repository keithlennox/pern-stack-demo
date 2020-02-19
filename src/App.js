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

  /*Create an object containing form values that are set to to empty.
  Having an initial blank state is useful, because after we submit the form, we can return it to the initial, empty value.*/
  const initialFormState = { id: null, name: '', username: '' }

  /*Use the "useState" hook to create state objects. You can have as many state objects as you want. Here we create 3.*/
  const [users, setUsers] = useState(usersData)//Create users state and set initial value to dummy data.
  const [currentUser, setCurrentUser] = useState(initialFormState)//Create currentUser state and populate with initial form state.
  const [editing, setEditing] = useState(false)//Create editing state and set to false. Indicates if form is in update or create mode.

  /*Return statement: all React components must contain a return statement. The return statement can only contain JSX.
  We use a ternary operator to check if the editing state is true or not. If true, show the edit form.
  If false, show the add form.*/
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