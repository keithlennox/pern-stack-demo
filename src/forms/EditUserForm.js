import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../UserContext'

const EditUserForm = () => {

  //Use the React useContext hook to retrieve the state objects from the Context API so that they're avaiable in the js file.
  const { users, setUsers, setEditing, currentUser } = useContext(UserContext)

  /*Use the useState hook to create user state and populate the initial values with the currentUser state.
  This state is not added to the React Context API.
  Therefore it is not availble outside of this js file. This is ok because it's only used to 
  temporarily keep track of what's currently in the add user form.
  As soon as the form is submitted, we add what's in user state to users state, which is available globally.
  Immediately after this we -reset the form to blank. So form state is never needed except in this js file.*/
  const [user, setUser] = useState(currentUser)

  /*Normally, if you start editing one user, then click the edit button on another user,
  the user info in the form does not refresh. This is because the component EditUserForm
  component is already open, and although the state on the parent component (App) has changed,
  it's not registered down to the cild (EditUserForm) component. We have to let the EditUserForm
  component know the state has changed. To do this, we use the useEffect() hook. In the Effect Hook,
  we create a callback function that updates the user state with the currentUser state.*/
  useEffect(
    () => {
      setUser(currentUser)
    },
    [currentUser]
  )
 
  /*Handle input change function
  Called whenever the form field values change.*/
  const handleInputChange = event => { //The event object contains the name and value for whichever form field triggered this function (by being updated).
    const { name, value } = event.target //Object destructuring is used to get the name and value from the event object.
    setUser({ ...user, [name]: value }) //The spread operator is used to add the name and value to the local user state.
  }

  /*Update user function
  Triggered when update user button clicked.
  Gets the user id and user.
  Sets the editing state to false, which causes this form to be replaced with the add user form.
  Uses the map function to loop thru users state and update the appropriate user.*/
  const updateUser = (id, updatedUser) => {
    setEditing(false)
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  /*Return statement containing JSX, which contains the update user form.
  The form tag contains an onSubmit function, and we prevent the default form submission from firing.
  We call the updateUser function and pass it the user state and the user.id taken from the user state.
  The input tags contain an onChange event handler that calls the handleInputChange function
  any time the contents of the form field are updated by the user.
  The input tag's "value" attributes point to the user state so that the form field updates and
  displays whatever the user types into the field.
  The Cancel button changes the editing state to false, which causes this form to be replaced by the add user form.*/
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