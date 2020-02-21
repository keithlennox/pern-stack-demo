import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../UserContext'

const EditUserForm = () => {

  //Use the React useContext hook to retrieve the state objects from the Context API so that they're avaiable in the js file.
  const { user, setUser, users, setUsers, editing, setEditing } = useContext(UserContext)

  /*Handle change function
  Called whenever the form field values change.*/
  const handleChange = event => { //The event object contains the name and value for whichever form field triggered this function (by being updated).
    const { name, value } = event.target //Object destructuring is used to get the name and value from the event object.
    setUser({ ...user, [name]: value }) //The spread operator is used to add the name and value to the local user state.
  }

  /*Edit user function
  Triggered when the update user button is clicked.
  Uses the map function to loop thru users state and replace the users state user with the user state user.*/
  const editUser = (user) => { //This function gets the user state as a parameter.
    setUsers(users.map(mappedUser => (mappedUser.id === user.id ? user : mappedUser)))
    setEditing(false) //Set the editing state to false, which causes this form to be replaced with the add user form.
    setUser({ id: null, name: '', username: '' }) // Re-set user state back to empty.
  }

  /*Cancel Edit function
  Triggered when cancel button is clicked.*/
  const cancelEdit = () => {
    setEditing(false) //Set the editing state to false, which causes this form to be replaced with the add user form.
    setUser({ id: null, name: '', username: '' }) // Re-set user state back to empty.
  }

  /*Return statement (JSX) contains the edit user form.
  The input tag's "value" attributes display the user state. When the form first loads after the edit button is clicked,
  the form fields contain the data for the user that was click.
  The input tags contain an onChange event handler that calls the handleChange function
  any time the contents of the form field are updated. The handleChange function updates
  the user state. Because the input tags value displays the user state, as the data in the form fields is updated,
  whatever is typed into the field is displayed.
  The form tag contains an onSubmit function, and we prevent the default form submission from firing.
  We call the editUser function and pass it the user state and the user state id.
  The Cancel button changes the editing state to false, which causes this form to be replaced by the add user form.*/
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        editUser(user)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleChange} />
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleChange} />
      <button>Update user</button>
      <button onClick={cancelEdit} className="button muted-button">Cancel</button>
    </form>
  )

}

export default EditUserForm