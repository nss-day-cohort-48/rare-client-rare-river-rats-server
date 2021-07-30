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
  const [rare_users, setRareUsers] = useState({})
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true)

  const { rareUserId } = useParams()

  const history = useHistory()



  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newRareUser = { ...rare_users }
    /* rareUser is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newRareUser[event.target.id] = event.target.value
    // update state
    setRareUsers(newRareUser)
  }


  const handleSaveRareUser = () => {
    if (rare_users.rareUserId === 0) {
      window.alert("Please Enter a New User")
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      if (rareUserId) {
        //PUT - update
        updateRareUser({
          id: rare_users.id,
          bio: rare_users.bio,
          profile_image_url: rare_users.profile_image_url,
          created_on: rare_users.created_on,
          active: rare_users.active,
          first_name: rare_users.first_name,
          last_name: rare_users.last_name,
          email: rare_users.email,
          username: rare_users.username,
          password: rare_users.password,
          is_admin: rare_users.is_admin,

        })
          .then(() => history.push(`/rare_users/detail/${rare_users.id}`))
      } else {
        //POST - add
        addRareUser({          
          first_name: rare_users.first_name,
          last_name: rare_users.last_name,
          email: rare_users.email,
          bio: rare_users.bio,          
          username: rare_users.username,
          password: rare_users.password,
          profile_image_url: rare_users.profile_image_url,
          created_on: rare_users.created_on,
          active: rare_users.active,
        })
          .then(() => history.push("/rare_users"))
      }
    }
  }

  // Get customers and locations. If rareUserId is in the URL, getRareUserById
  useEffect(() => {
    getRareUsers().then(() => {
      if (rareUserId) {
        getRareUserById(rareUserId)
          .then(rare_users => {
            setRareUsers(rare_users)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })
  }, [])
  return (

    <form className="Rare_User_Form">
      <h2 className="Rare_User_Form__title"> User </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="username"> Choose a Username:  </label>
          <input type="text" id="username" required autoFocus className="form-control" placeholder="Username" value={rare_users.username} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="first_name"> User's First Name:  </label>
          <input type="text" id="first_name" required autoFocus className="form-control" placeholder="Enter User's First Name" value={rare_users.first_name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      
      <fieldset>
        <div className="form-group">
          <label htmlFor="last_name"> User's Last Name:  </label>
          <input type="text" id="last_name" required autoFocus className="form-control" placeholder="Enter User's Last Name" value={rare_users.last_name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
            <div className="form-group-email">
            <label htmlFor="email">Add an Email:  </label>
            <input type="text" id="email" required autoFocus className="form-control" placeholder="Enter an Email " value={rare_users.email} onChange={handleControlledInputChange} />
          </div>
        </fieldset>

      <fieldset>
        <div className="form-group-bio">
          <label htmlFor="bio"> Write Something Interesting About Yourself:  </label>
          <input type="text" id="bio" required autoFocus className="form-control" placeholder="Enter Bio Info" value={rare_users.bio} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group-img">
          <label htmlFor="text">Add an Image:  </label>
          <input type="text" id="profile_image_url"
            name="profile_image_url" required autoFocus className="form-control" placeholder="Enter a Photo " value={rare_users.profile_image_url} onChange={handleControlledInputChange} />
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