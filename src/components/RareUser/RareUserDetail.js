import React, { useContext, useEffect, useState } from "react"
import { RareUserContext } from "./RareUserProvider"
import "./RareUsers.css"
import { useParams, useHistory } from "react-router-dom"

export const RareUserDetails = (props) => {
    const { releaseRareUser, getRareUserById } = useContext(RareUserContext)

    const [rareUser, setRareUser] = useState({})

    const { rareUserId } = useParams()// url of rareUsers

    useEffect(() => {
        const rareUserId = parseInt(props.match.params.rareUserId)
        getRareUserById(rareUserId)
            .then(setRareUser)
    }, [])

    const history = useHistory()

    const handleRelease = () => {
        releaseRareUser(rareUser.id).then(() => {
            history.push("/rareUsers");
        })
    }

    return (
        <section className="rareUser">
            <div className="rareUser__owner"> {rareUser.profile_image_url}</div>
            
            <h3 className="rareUser__first_name">{rareUser.first_name}</h3>
            <h3 className="rareUser__last_name">{rareUser.last_name}</h3>
            <div className="rareUser__location">Username: {rareUser.username}</div>
            
            <div className="rareUser__bio">Bio:{rareUser.bio}</div>
            
            
            <div className="rareUser__treatment">Date Created {rareUser.created_on}</div>

            {rareUser === rareUser.id ? <button onClick={() => {
                handleRelease()
            }}>Remove User</button> : <div></div>}

            {rareUser === rareUser.id ?
                <button onClick={() => {
                    history.push(`/rareUsers/edit/${rareUser.id}`)
                }}>  Edit User </button> : <div></div>}

        </section>
    )
}