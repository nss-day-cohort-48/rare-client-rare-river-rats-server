import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const TagContext = createContext()

// This component establishes what data can be used.
export const TagProvider = (props) => {
    const [tags, setTags] = useState([])

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

    /*
        You return a context provider which has the
        `tags` state, `getTags` function,
        and the `addTag` function as keys. This
        allows any child elements to access them.
    */
    return (
        <TagContext.Provider value={{
            tags, getTags, addTag
        }}>
            {props.children}
        </TagContext.Provider>
    )
}