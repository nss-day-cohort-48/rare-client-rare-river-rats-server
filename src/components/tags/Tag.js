import React, { useContext, useEffect, useState } from "react"
import { TagContext } from "./TagProvider"
import "./Tag.css"
import { useHistory, useParams } from "react-router-dom"

export const Tag = () => {
  // This state changes when `getTags()` is invoked below
  const { tags, getTags, deleteTag } = useContext(TagContext)
  const [ tag, setTag ] = useState({})

  const { tagId } = useParams();
  
  const history = useHistory()

  const handleDelete = (tagId) => {
    deleteTag(tagId)
      .then(() => {
        history.push("/tags")
      })
  }

  //useEffect - reach out to the world for something
  useEffect(() => {
    getTags()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
        
    const thisTag = tags.find(a => a.id === parseInt(tagId)) || {} 

    setTag(thisTag)
}, [tags])
  

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
              <div className="tag__edit">
                <button onClick={event => {
                  event.preventDefault()
                  history.push(`/tags/edit/${tag.id}`)
                }}>
                  Edit
                </button>
              </div>
              <div className="tag__delete">
                <button onClick={event => {
                  event.preventDefault()
                  handleDelete(tag.id)}}>
                  Delete
                </button>
              </div>
              <div className="tag__label">
                { tag.label }
              </div>
            </div>
          )
        })
      }
    </div>
    </>
  )
}