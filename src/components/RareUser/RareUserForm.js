import React, { useContext, useEffect, useState } from "react"
import { Rare_User_Context } from "../RareUser/RareUserProvider"
import { useHistory, useParams } from 'react-router-dom';
import "./rare_user.css"

export const Rare_UserForm = () => {
  const { addRare_User, getRare_Users, update_rare_user, getrare_userById } = useContext(Rare_User_Context)

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
 
  Define the intial state of the form inputs with useState()
  */


  //for edit, hold on to state of rare_user in this view
  const [rare_user, setRare_Users] = useState({})
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true)

  const { rare_user_id } = useParams()

  const history = useHistory()



  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const new_rare_user = { ...rare_user }
    /* rare_user is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    new_rare_user[event.target.id] = event.target.value
    // update state
    setRare_Users(new_rare_user)
  }


  const handleSaveRare_User = () => {
    if (rare_user.rare_user_id === 0) {
      window.alert("Please Enter a New User")
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      if (rare_user_id) {
        //PUT - update
        update_rare_user({
          id: rare_user.id,
          name: rare_user.name,
          age: rare_user.age,
          email: rare_user.email,
          imageURL: rare_user.imageURL,

        })
          .then(() => history.push(`/rare_users/detail/${rare_user.id}`))
      } else {
        //POST - add
        addRare_User({
          name: rare_user.name,
          age: rare_user.age,
          email: rare_user.email,
          imageURL: rare_user.imageURL,
        })
          .then(() => history.push("/rare_users"))
      }
    }
  }

  // Get customers and locations. If rare_user_id is in the URL, getrare_userById
  useEffect(() => {
    getRare_Users().then(() => {
      if (rare_user_id) {
        getrare_userById(rare_user_id)
          .then(rare_user => {
            setRare_Users(rare_user)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })
  }, [])
  return (

    <form className="Rare_UserForm">
      <h2 className="Rare_UserForm__title"> rare_user</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name"> rare_user's Name:  </label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Enter a rare_user's Name" value={rare_user.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group-age">
          <label htmlFor="number">Enter rare_user's Age:  </label>
          <input type="text" id="age" required autoFocus className="form-control" placeholder="Enter Age" value={rare_user.age} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group-email">
          <label htmlFor="email">Add an Email:  </label>
          <input type="text" id="email" required autoFocus className="form-control" placeholder="Enter an Email " value={rare_user.email} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group-img">
          <label htmlFor="text">Add an Image:  </label>
          <input type="text" id="imageURL"
            name="imageURL" required autoFocus className="form-control" placeholder="Enter a Photo " value={rare_user.imageURL} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveRare_User()
        }}>
        {rare_user_id ? <>Save Family rare_user</> : <>Add Family rare_user</>}</button>
    </form>
  )
}