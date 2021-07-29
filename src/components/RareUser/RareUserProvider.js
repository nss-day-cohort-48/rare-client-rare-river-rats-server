import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const Rare_User_Context = createContext()

// This component establishes what data can be used.
export const RareUserProvider = (props) => {

    const [rare_user, setRare_Users] = useState([])

    const getRare_Users = () => {
        return fetch("http://localhost:8088/rare_users")
            .then(res => res.json())
            .then(setRare_Users)
    }

    const addRare_User = rare_userObj => {
        return fetch("http://localhost:8088/rare_users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rare_userObj)
        })
            .then(getRare_Users)
    }

    const releaseMember = memberId => {
        return fetch(`http://localhost:8088/members/${memberId}`, {
            method: "DELETE"
        })
            .then(getMemberById)
    }

    const getMemberById = memberId => {
        return fetch(`http://localhost:8088/members/${memberId}?_embed=room`)
            .then(res => res.json())
    }

    const updateMember = member => {
        return fetch(`http://localhost:8088/members/${member.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(member)
        })
            .then(getRare_Users)
    }

    return (
        <Rare_User_Context.Provider value={{
            members, getRare_Users, addRare_User, releaseMember, getMemberById, updateMember
        }}>
            {props.children}
        </Rare_User_Context.Provider>
    )
}