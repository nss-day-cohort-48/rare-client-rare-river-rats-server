import React, { useContext, useEffect, useState } from "react"
import { RareUserContext } from "../RareUser/RareUserProvider"
import { useHistory, useParams } from 'react-router-dom';
import "./RareUser.css"

export const RareUserForm = () => {
  const { addRareUser, getRareUsers, updateRareUser, getRareUserById } = useContext(RareUserContext)

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
 
  Define the intial state of the form inputs with useState()
  */


  //for edit, hold on to state of rareUser in this view
  const [rareUser, setRareUsers] = useState({})
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true)

  const { rareUserId } = useParams()

  const history = useHistory()



  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newRareUser = { ...rareUser }
    /* rareUser is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newRareUser[event.target.id] = event.target.value
    // update state
    setRareUsers(newRareUser)
  }


  const handleSaveRareUser = () => {
    if (rareUser.rareUserId === 0) {
      window.alert("Please Enter a New User")
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      if (rareUserId) {
        //PUT - update
        updateRareUser({
          id: rareUser.id,
          bio: rareUser.bio,
          profile_image_url: rareUser.profile_image_url,
          created_on: rareUser.created_on,
          active: rareUser.active,
          first_name: rareUser.first_name,
          last_name: rareUser.last_name,
          email: rareUser.email,
          username: rareUser.username,
          password: rareUser.password,
          is_admin: rareUser.is_admin,

        })
          .then(() => history.push(`/rareUsers/detail/${rareUser.id}`))
      } else {
        //POST - add
        addRareUser({          
          first_name: rareUser.first_name,
          last_name: rareUser.last_name,
          email: rareUser.email,
          bio: rareUser.bio,          
          username: rareUser.username,
          password: rareUser.password,
          profile_image_url: rareUser.profile_image_url,
          created_on: rareUser.created_on,
          active: rareUser.active,
        })
          .then(() => history.push("/rareUsers"))
      }
    }
  }

  // Get customers and locations. If rareUserId is in the URL, getRareUserById
  useEffect(() => {
    getRareUsers().then(() => {
      if (rareUserId) {
        getRareUserById(rareUserId)
          .then(rareUser => {
            setRareUsers(rareUser)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })
  }, [])
  return (

    <form className="RareUserForm">
      <h2 className="RareUserForm__title"> User</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="username"> Choose a Username:  </label>
          <input type="text" id="username" required autoFocus className="form-control" placeholder="Username" value={rareUser.username} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="first_name"> User's First Name:  </label>
          <input type="text" id="first_name" required autoFocus className="form-control" placeholder="Enter User's First Name" value={rareUser.first_name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      
      <fieldset>
        <div className="form-group">
          <label htmlFor="last_name"> User's Last Name:  </label>
          <input type="text" id="last_name" required autoFocus className="form-control" placeholder="Enter User's Last Name" value={rareUser.last_name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
            <div className="form-group-email">
            <label htmlFor="email">Add an Email:  </label>
            <input type="text" id="email" required autoFocus className="form-control" placeholder="Enter an Email " value={rareUser.email} onChange={handleControlledInputChange} />
          </div>
        </fieldset>

      <fieldset>
        <div className="form-group-bio">
          <label htmlFor="bio"> Write Something About Yourself.  </label>
          <input type="text" id="bio" required autoFocus className="form-control" placeholder="Enter Bio Info" value={rareUser.bio} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group-img">
          <label htmlFor="text">Add an Image:  </label>
          <input type="text" id="profile_image_url"
            name="profile_image_url" required autoFocus className="form-control" placeholder="Enter a Photo " value={rareUser.profile_image_url} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the pbio
          handleSaveRareUser()
        }}>
        {rareUserId ? <>Save Current User</> : <>Add New User</>}</button>
    </form>
  )
}