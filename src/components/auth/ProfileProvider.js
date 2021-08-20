import React, { useState,createContext } from "react"

export const ProfileContext = createContext()

export const ProfileProvider = (props) => {

    const [profile, setProfiles] = useState([])

    const [currentProfile, setcurrentProfile] = useState([])

    const getProfile = () => {
        return fetch("http://localhost:8000/profile", {
          headers: {
            Authorization: `Token ${localStorage.getItem("rare_token")}`,
          },
        })
        .then(res => res.json())
            .then(setProfiles)
    }

    const getProfileById = (id) => {
        return fetch(`http://localhost:8000/profile/${id}`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("rare_token")}`,
          },
        })
        .then(res => res.json())
            .then(setcurrentProfile)
    }

    return (
        <ProfileContext.Provider value={{
            profile, currentProfile, getProfile, getProfileById
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}