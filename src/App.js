import React, { useState, useEffect } from 'react'
import UserTable from './Components/UserTable'
import AddUserForm from './Components/AddUserForm'
import EditUserForm from './Components/EditUserForm'
import { UserProvider } from './UserContext'

//Create dummy data (to be replaced with db)
const dummyUsersData = [
  { id: 1, name: 'Tania', username: 'floppydiskette' },
  { id: 2, name: 'Craig', username: 'siliconeidolon' },
  { id: 3, name: 'Ben', username: 'benisphere' },
  { id: 4, name: 'Kevin', username: 'kevisphere' },
  { id: 5, name: 'Marcia', username: 'marciasphere' },
  { id: 6, name: 'Fred', username: 'fredisphere' },
  { id: 7, name: 'Tammy', username: 'tammysphere' },
  { id: 8, name: 'Wanda', username: 'wandasphere' }
]

const App = () => {

  /*Use the "useState" hook to create state objects. You can have as many state objects as you want.*/
  const [user, setUser] = useState({ id: null, name: '', username: '' })//Create user state and populate the initial values to blank.
  const [users, setUsers] = useState(dummyUsersData)//Create users state and set initial value to dummy data.
  const [editing, setEditing] = useState(false)//Create editing state and set initial value to false. Indicates if form is in update or create mode.

  /*Return statement (JSX).
  UserProvider (imported from UserContext.js) wraps all child components, which makes state objects avail to child components.
  We use a ternary operator to check if the editing state is true or false. If true, we show the edit user form.
  If false, show the add user form.
   */
  return (
    <UserProvider value={{ user, setUser, users, setUsers, editing, setEditing }} >
      <div className="container">
        <h1>My CRUD App</h1>
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