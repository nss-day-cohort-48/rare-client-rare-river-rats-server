import React, { useState, useContext, useEffect } from "react"
import { RareUserContext } from "./RareUserProvider"
import { RareUserDetail } from "./RareUserDetail"
import { useHistory } from 'react-router-dom'
import "./RareUser.css"

export const RareUserList = () => {
    const { getRareUsers, rareUsers, searchTerms } = useContext(RareUserContext)

    const [filteredRareUsers, setFiltered] = useState([])

    const history = useHistory()
    // Initialization effect hook -> Go get rareUser data
    useEffect(() => {
        getRareUsers()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = rareUsers.filter(rareUser => rareUser.first_name.toLowerCase().includes(searchTerms.toLowerCase())
            )
            setFiltered(subset)
        } else {
            setFiltered(rareUsers)
        }
    }, [searchTerms, rareUsers])

    useEffect(() => {
        setFiltered(rareUsers)
    }, [rareUsers])

    return (
        <div style={{ marginTop: "2rem" }}>
            <>
            <h2>Users</h2>
                <div className="vertical-center">
                    <button onClick={() => history.push("/rareUsers/create")
                    }>
                        Add New User
                    </button>
                </div>
                {/* <section className="rareUsers">
                    {
                        filteredRareUsers.map(rareUser => <RareUserDetail key={rareUser.id} rareUser={rareUser} />
                        )
                    }
                </section> */}
            </>
        </div>
    )
}