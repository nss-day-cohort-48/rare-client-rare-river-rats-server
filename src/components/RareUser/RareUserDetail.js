import React, { useContext, useEffect, useState } from "react"
import { RareUserContext } from "./RareUserProvider"
import "./RareUser.css"
import { useHistory, useParams } from "react-router-dom"


export const RareUserDetail = () => {
    const { getRareUserById, releaseRareUser  } = useContext(RareUserContext)

    const [rare_users, setRareUsers] = useState({})

    const { rareUserId } = useParams()// url of rareUsers

    useEffect(() => {
        if (rareUserId) {
            getRareUserById(parseInt(getRareUserById)).then((rareUserObj) => {
                setRareUsers(rareUserObj)
            });
        } else { setRareUsers(rare_users) }
    }, [rareUserId]);

    const history = useHistory()

    const handleUserRelease = () => {
        //if user.id === 1 
        // return all the normal stuff you have so far 
        //else return all inputs with readOnly 
        releaseRareUser(rare_users.id)
            .then(() => {
                history.push("/rare_users");
            })
    }

    return (
        <>
            <section className="rare_users" key={rare_users.id}>

                <div className="rare_users__imageURL"><img src={rare_users.profile_image_url} alt="Users Picture" />
                </div>

                <h3 className="rare_users__first_name">{rare_users.first_name}</h3>

                <h3 className="rare_users__last_name">{rare_users.last_name}</h3>
                <div className="rare_users__location">Username: {rare_users.username}</div>

                <div className="rare_users__bio">Bio:{rare_users.bio}</div>


                <div className="rare_users__treatment">Date Created {rare_users.created_on}</div>

                <button onClick={() => handleUserRelease(rare_users.id).then(() => history.push("/rare_users"))} >Release User</button>

                <button onClick={() => {
                    history.push(`/rare_users/edit/${rare_users.id}`)
                }}>Edit</button>
            </section>
        </>
    )
}