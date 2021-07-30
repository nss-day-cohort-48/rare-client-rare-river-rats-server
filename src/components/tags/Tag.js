import React, { useContext, useEffect } from "react"
import { TagContext } from "./TagProvider"
import "./Tag.css"
import { useHistory } from "react-router-dom"

export const Tag = () => {
  // This state changes when `getTags()` is invoked below
  const { tags, getTags } = useContext(TagContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    getTags()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory()

  return (
    <>
      <h2>Tags</h2>
      <button onClick={
        () => history.push("/tags/create")
      }>
        Add Tag
      </button>
    <div className="tags">
      {
        tags.map(tag => {
          return (
            <div className="tag" id={`tag--${tag.id}`} key={tag.id}>
              <div className="tag__label">
                Label: { tag.label }
              </div>
            </div>
          )
        })
      }
    </div>
    </>
  )
}