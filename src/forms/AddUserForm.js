import React, { useState, useContext } from 'react'
import UserContext from '../UserContext'

const AddUserForm = () => {

  //Use the React useContext hook to retrieve the state objects from the Context API so that they're avaiable in the js file.
  const { users, setUsers, editing, setEditing, currentUser, setCurrentUser } = useContext(UserContext)

  /*Create an object containing form values that are set to to empty.
  Having an initial blank state is useful, because after we submit the form, we can return it to the initial, empty value.*/
  const initialFormState = { id: null, name: '', username: '' }

  /*Use the useState hook to create user state and populate the initial values to blank.
  This state is not added to the React Context API.
  Therefore it is not availble outside of this js file. This is ok because it's only used to 
  temporarily keep track of what's currently in the add user form.
  As soon as the form is submitted, we add what's in user state to users state, which is available globally.
  Immediately after this we -reset the form to blank. So form state is never needed except in this js file.*/
  const [user, setUser] = useState(initialFormState)

  /*Handle input change function
  Called whenever the form field values change.*/
  const handleInputChange = event => { //The event object contains the name and value for whichever form field triggered this function (by being updated).
    const { name, value } = event.target //Object destructuring is used to get the name and value from the event object.
    setUser({ ...user, [name]: value }) //The spread operator is used to add the name and value to the local user state.
  }

  /*Add user function
  Called when user submit form.*/
  const addUser = user => { //Takes the user state as a parameter.
    user.id = users.length + 1 //Increment the user id, eventually this would be handled automatically by the posgreSQL db.
    setUsers([...users, user]) //The spread operator is used to add the user state to the users state.
  }

  /*Return statement containing JSX, which contains the add user form.
  The form tag contains an onSubmit function, and we prevent the default form submission from firing.
  A small bit of validation makes sure empty values cannot be submitted.
  We call the addUser function and pass it the user state.
  Finally, we reset the form to its initial value after successful submission.
  The input tags contain an onChange event handler that calls the handleInputChange function
  any time the contents of the form field are updated by the user.
  The input tag's "value" attributes point to the user state so that the form field updates and
  displays whatever the user types into the field.*/
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