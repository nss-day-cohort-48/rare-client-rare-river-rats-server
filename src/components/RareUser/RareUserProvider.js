import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const RareUserContext = createContext()

// This component establishes what data can be used.
export const RareUserProvider = (props) => {

    const [rare_users, setRare_Users] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getRareUsers = () => {
        return fetch("http://localhost:8088/rare_users")
            .then(res => res.json())
            .then(setRare_Users)
    }

    const addRareUser = rareUserObj => {
        return fetch("http://localhost:8088/rare_users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rareUserObj)
        })
            .then(getRareUsers)
    }    

    const getRareUserById = (id) => {
        return fetch(`http://localhost:8088/rare_users/${id}`)
            .then(res => res.json())
    }

    const updateRareUser = rare_user => {
        return fetch(`http://localhost:8088/rare_users/${rare_user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rare_user)
        })
            .then(getRareUsers)
    }
    
    const releaseRareUser = rareUserId => {
        return fetch(`http://localhost:8088/rare_users/${rareUserId}`, {
            method: "DELETE"
        })
            .then(getRareUserById)
    }

    return (
        <RareUserContext.Provider value={{
            rare_users, searchTerms, setTerms, getRareUsers, addRareUser, releaseRareUser, getRareUserById, updateRareUser
        }}>
            {props.children}
        </RareUserContext.Provider>
    )
}