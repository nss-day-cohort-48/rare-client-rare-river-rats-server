import React, { useContext, useEffect, useState } from "react"
import { RareUserContext } from "./RareUserProvider"
import "./RareUsers.css"

export const RareUserDetails = (props) => {
    const { releaseRareUser, getRareUserById } = useContext(RareUserContext)

    const [rareUser, setRareUser] = useState({})

    useEffect(() => {
        const rareUserId = parseInt(props.match.params.rareUserId)
        getRareUserById(rareUserId)
            .then(setRareUser)
    }, [])

    return (
        <section className="rareUser">
            <h3 className="rareUser__name">{rareUser.name}</h3>
            <div className="rareUser__breed">{rareUser.breed}</div>
            <div className="rareUser__location">Location: {rareUser.location.name}</div>
            <div className="rareUser__owner">Customer: {rareUser.customer.name}</div>
            <div className="rareUser__treatment">Treatment: {rareUser.treatment}</div>

            <button onClick={() => releaseRareUser(rareUser.id).then(() => props.history.push("/rareUsers"))} >Release rareUser</button>

            <button onClick={() => {
                props.history.push(`/rareUsers/edit/${rareUser.id}`)
            }}>Edit</button>
        </section>
    )
}2