import React, { useContext, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"
import { useHistory } from "react-router-dom"

export const Category = () => {
  // This state changes when `getCategories()` is invoked below
  const { categories, getCategories } = useContext(CategoryContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    getCategories()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory()

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
              <div className="category__label">
                Label: { category.label }
              </div>
            </div>
          )
        })
      }
    </div>
    </>
  )
}