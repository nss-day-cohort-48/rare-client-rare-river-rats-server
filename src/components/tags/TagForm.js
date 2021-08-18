import React, { useContext, useState, useEffect } from "react"
import { TagContext } from "./TagProvider"
import "./Tag.css"
import { useHistory, useParams } from 'react-router-dom';

export const TagForm = () => {
  const { addTag, updateTag, getTagById } = useContext(TagContext)
  

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
  Define the initial state of the form inputs with useState()
  */

  const [tag, setTag] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const { tagId } =useParams();

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
    

    if (tag.label === "") {
      window.alert("Please select a label")
    } else {
      setIsLoading(true);
      //Invoke addTag passing the new tag object as an argument
      //Once complete, change the url and display the tag list
      if (tagId){
        updateTag({
          id: tag.id,
          label: tag.label
        })
        .then(() => history.push("/tags"))
      }else {
        addTag({
          label: tag.label
        })
        .then(() => history.push("/tags"))
      }      
    }
  }

  useEffect(() => {
    if (tagId){
      getTagById(tagId)
      .then(tag => {
        setTag(tag)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <form className="tagForm">
      <h2 className="tagForm__title">New Tag</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="label">Tag Label:</label>
          <input type="text" id="label" required autoFocus className="form-control" placeholder="Tag label" value={tag.label} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary" disabled={isLoading} onClick={event => {
        event.preventDefault()
        handleClickSaveTag()
      }}>
        {tagId ? <>Save Tag</> : <>Add Tag</>}
          </button>
    </form>
  )
}