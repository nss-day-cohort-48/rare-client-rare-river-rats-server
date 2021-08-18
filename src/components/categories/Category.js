import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"
import { useHistory, useParams } from "react-router-dom"

export const Category = () => {
  // This state changes when `getCategories()` is invoked below
  const { categories, getCategories, deleteCategory } = useContext(CategoryContext)
  const [ category, setCategory ] = useState({})

  const { categoryId } = useParams();
  
  const history = useHistory()

  const handleDelete = () => {
    deleteCategory(category.id)
      .then(() => {
        history.push("/categories")
      })
  }

  //useEffect - reach out to the world for something
  useEffect(() => {
    getCategories()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
        
    const thisCategory = categories.find(a => a.id === parseInt(categoryId)) || {} 

    setCategory(thisCategory)
}, [categories])
  

  return (
    <>
      <h2>Categories</h2>
      <button onClick={
        () => history.push("/categories/create")
      }>
        Add Category
      </button>
    <div className="categories">
      {
        categories.map(category => {
          return (
            <div className="category" id={`category--${category.id}`} key={category.id}>
              <div className="category__edit">
                <button onClick={
                  () => history.push(`/categories/edit/${category.id}`)
                }>
                  Edit
                </button>
              </div>
              <div className="category__delete">
                <button onClick={handleDelete}>
                  Delete
                </button>
              </div>
              <div className="category__label">
                { category.label }
              </div>
            </div>
          )
        })
      }
    </div>
    </>
  )
}