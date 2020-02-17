import React, { useState, useContext } from 'react'
import UserContext from '../UserContext'

const AddUserForm = () => {

  const { users, setUsers, editing, setEditing, currentUser, setCurrentUser } = useContext(UserContext)

  /*Create an object containing form values = to empty.
  Create a user state and set the initial state to the empty values.
  Having initial state in a variable is useful, because after we submit the form, we can return it to the initial, empty value.
  This state will just be temporary, for keeping track of what's currently in the add user form.*/
  const initialFormState = { id: null, name: '', username: '' }
  const [user, setUser] = useState(initialFormState)

  /*Function that gets new user values from the form and updates user state.
  The event paremeter gets passed on any on event in the DOM.
  Object destructuring is used to get values from the event object.*/
  const handleInputChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  //Add user function
  const addUser = user => { //This function takes a new user object as a parameter.
    user.id = users.length + 1 //Increment the user id, eventually would be handled by posgreSQL db.
    setUsers([...users, user]) //Add new user object to user array. The ...users code ensures that all the previous users remain in the array.
  }

  /*
  The form element contains an onSubmit function, and we prevent the default form submission from firing.
  A small bit of validation makes sure empty values cannot be submitted.
  We passed the addUser function down with props, so we use props now to access the function.
  We pass the new user object to the addUser() function as a paremeter.
  Finally, reset the form to its initial value after successful submission.
  */
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        if (!user.name || !user.username) return
        addUser(user)
        setUser(initialFormState)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} />
      <button>Add new user</button>
    </form>
  )
}

export default AddUserForm