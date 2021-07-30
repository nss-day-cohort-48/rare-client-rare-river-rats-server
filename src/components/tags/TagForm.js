import React, { useContext, useState } from "react"
import { TagContext } from "./TagProvider"
import "./Tag.css"
import { useHistory } from 'react-router-dom';

export const TagForm = () => {
  const { addTag } = useContext(TagContext)
  

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
  Define the initial state of the form inputs with useState()
  */

  const [tag, setTag] = useState({
    label: ""
  });

  const history = useHistory();

  /*
  Reach out to the world and get tags state
  and tags state on initialization.
  */
  

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newTag = { ...tag }
    /* Tag is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newTag[event.target.id] = event.target.value
    // update state
    setTag(newTag)
  }

  const handleClickSaveTag = (event) => {
    event.preventDefault() //Prevents the browser from submitting the form

    if (tag.label === "") {
      window.alert("Please select a label")
    } else {
      //Invoke addTag passing the new tag object as an argument
      //Once complete, change the url and display the tag list

      const newTag = {
        label: tag.label,
      }
      addTag(newTag)
        .then(() => history.push("/tags"))
    }
  }

  return (
    <form className="tagForm">
      <h2 className="tagForm__title">New Tag</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="label">Tag Label:</label>
          <input type="text" id="label" required autoFocus className="form-control" placeholder="Tag label" value={tag.label} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={handleClickSaveTag}>
        Save Tag
          </button>
    </form>
  )
}