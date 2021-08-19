import React, { useState, useContext, useEffect } from "react"
import { RareUserContext } from "./RareUserProvider"
import { RareUserDetail } from "./RareUserDetail"
import { useHistory } from 'react-router-dom'
import "./RareUser.css"

export const RareUserList = () => {
    const {  rare_users, getRareUsers, searchTerms } = useContext(RareUserContext)

    const [filteredRareUsers, setFiltered] = useState([])

    const history = useHistory()
    // Initialization effect hook -> Go get rareUser data
    useEffect(() => {
        getRareUsers()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = rare_users.filter(rareUsers => rareUsers.user.first_name.toLowerCase().includes(searchTerms.toLowerCase())
            )
            setFiltered(subset)
        } else {
            setFiltered(rare_users)
        }
    }, [searchTerms, rare_users])

    // useEffect(() => {
    //     setFiltered(rareUsers)
    // }, [rareUsers])

    return (
        <div style={{ marginTop: "2rem" }}>
            <>
            <h2>Users</h2>
                <div className="vertical-center">
                    <button onClick={() => history.push("/rareusers/create")
                    }>
                        Add New User
                    </button>
                </div>
                <section className="rare_users">
                    {
                        filteredRareUsers.map(rareUsers => <RareUserDetail key ={rareUsers.id} rareUsers={rareUsers.user.first_name} />
                        )
                    }
                </section>
            </>
        </div>
    )
}