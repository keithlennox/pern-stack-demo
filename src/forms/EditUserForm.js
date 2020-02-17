import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../UserContext'

const EditUserForm = () => {

  const { users, setUsers, editing, setEditing, currentUser, setCurrentUser } = useContext(UserContext)

  const [user, setUser] = useState(currentUser)

  /*In the Effect Hook, we create a callback function that updates the user state with the new prop thats being sent through.*/
  useEffect(
    () => {
      setUser(currentUser)
    },
    [currentUser]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  //Update user function
  const updateUser = (id, updatedUser) => {
    setEditing(false)
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        updateUser(user.id, user)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} />
      <button>Update user</button>
      <button onClick={() => setEditing(false)} className="button muted-button">Cancel</button>
    </form>
  )
}

export default EditUserForm