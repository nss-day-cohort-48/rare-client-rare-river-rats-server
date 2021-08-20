import React, { useContext, useEffect, useState } from "react"
import { RareUserContext } from "./RareUserProvider"
import "./RareUser.css"
import { useHistory, useParams } from "react-router-dom"


export const RareUserDetail = () => {
    const { getRareUsers, rare_users  } = useContext(RareUserContext)

    // const { getRareUserById, releaseRareUser  } = useContext(RareUserContext)

    // const [rare_userss, setRareUsers] = useState({})

    const { rareUserId } = useParams()// url of rareUsers

useEffect(() => {
    getRareUsers(rareUserId)
    }, [])
    // useEffect(() => {
    //     if (rareUserId) {
    //         getRareUserById(parseInt(getRareUserById)).then((rareUserObj) => {
    //             setRareUsers(rareUserObj)
    //         });
    //     } else { setRareUsers(rare_userss) }
    // }, [rareUserId]);

    const history = useHistory()

    // const handleUserRelease = () => {
    //     //if user.id === 1 
    //     // return all the normal stuff you have so far 
    //     //else return all inputs with readOnly 
    //     releaseRareUser(rare_userss.id)
    //         .then(() => {
    //             history.push("/rare_userss");
    //         })
    // }

    return (
        <>
        <div>
          <h1>{rare_users.bio}</h1>
          <div>Name: {rare_users.user?.first_name} {rare_users.user?.last_name}</div>
          <img src={rare_users.profile_image_url} alt="ProfilePic"/>
          <div>Username: {rare_users.user?.username}</div>
          <div>Email: {rare_users.user?.email}</div>
          
          <div>Profile Type: {
              rare_users.user?.is_staff ? "Admin": "Rare_usersrare_users"
            }
            </div>
        </div>
        </>
      )
    }
//     return (
//         <>
        
//             <section className="rare_userss" key={rare_userss.id}>

//                 <div className="rare_userss__imageURL"><img src={rare_userss.profile_image_url} alt="Users Picture" />
//                 </div>

//                 <h3 className="rare_userss__first_name">{rare_userss.first_name}</h3>

//                 <h3 className="rare_userss__last_name">{rare_userss.last_name}</h3>
//                 <div className="rare_userss__location">Username: {rare_userss.username}</div>

//                 <div className="rare_userss__bio">Bio:{rare_userss.bio}</div>


//                 {/* <div className="rare_userss__created">Date Created {rare_userss.created_on}</div> */}

//                 <button onClick={() => handleUserRelease(rare_userss.id).then(() => history.push("/rare_userss"))} >Release User</button>

//                 <button onClick={() => {
//                     history.push(`/rare_userss/edit/${rare_userss.id}`)
//                 }}>Edit</button>
//             </section>
//         </>
//     )
// }