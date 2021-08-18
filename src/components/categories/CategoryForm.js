import React, { useContext, useState, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"
import { useHistory, useParams } from 'react-router-dom';

export const CategoryForm = () => {
  const { addCategory, updateCategory, getCategoryById } = useContext(CategoryContext)
  

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
  Define the initial state of the form inputs with useState()
  */

  const [category, setCategory] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const { categoryId } =useParams();

  const history = useHistory();

  /*
  Reach out to the world and get categories state
  and categories state on initialization.
  */
  

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newCategory = { ...category }
    /* Category is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newCategory[event.target.id] = event.target.value
    // update state
    setCategory(newCategory)
  }

  const handleClickSaveCategory = (event) => {
    

    if (category.label === "") {
      window.alert("Please select a label")
    } else {
      setIsLoading(true);
      //Invoke addCategory passing the new category object as an argument
      //Once complete, change the url and display the category list
      if (categoryId){
        updateCategory({
          id: category.id,
          label: category.label
        })
        .then(() => history.push("/categories"))
      }else {
        addCategory({
          label: category.label
        })
        .then(() => history.push("/categories"))
      }      
    }
  }

  useEffect(() => {
    if (categoryId){
      getCategoryById(categoryId)
      .then(category => {
        setCategory(category)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <form className="categoryForm">
      <h2 className="categoryForm__title">New Category</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="label">Category Label:</label>
          <input type="text" id="label" required autoFocus className="form-control" placeholder="Category label" value={category.label} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary" disabled={isLoading} onClick={event => {
        event.preventDefault()
        handleClickSaveCategory()
      }}>
        {categoryId ? <>Save Category</> : <>Add Category</>}
          </button>
    </form>
  )
}