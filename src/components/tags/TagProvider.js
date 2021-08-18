import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const TagContext = createContext()

// This component establishes what data can be used.
export const TagProvider = (props) => {
    const [tags, setTags] = useState([])

    const getTagById = (id) => {
        return fetch(`http://localhost:8000/tags/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
        .then(res => res.json())
    }

    const getTags = () => {
        return fetch("http://localhost:8000/tags", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
        .then(res => res.json())
        .then(setTags)
    }

    const addTag = tag => {
        return fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
        .then(response => response.json())
    }

    const updateTag = tagObj => {
        return fetch(`http://localhost:8000/tags/${tagObj.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagObj)
        })
        .then(getTags)
    }

    const deleteTag = tagId => {
        return fetch(`http://localhost:8000/tags/${tagId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            },
        })
        .then(getTags)
    }

    /*
        You return a context provider which has the
        `tags` state, `getTags` function,
        and the `addTag` function as keys. This
        allows any child elements to access them.
    */
    return (
        <TagContext.Provider value={{
            tags, getTags, addTag, updateTag, deleteTag, getTagById
        }}>
            {props.children}
        </TagContext.Provider>
    )
}