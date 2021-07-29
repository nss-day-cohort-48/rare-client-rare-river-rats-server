import React, { useState, useContext, useEffect } from "react"
import { RareUserContext } from "./RareUserProvider"
import RareUser from "./RareUser"
import "./RareUsers.css"

export const RareUserList = ({ history }) => {
    const { getRareUsers, rareUsers, searchTerms } = useContext(RareUserContext)

    const [filteredRareUsers, setFiltered] = useState([])

    // Initialization effect hook -> Go get rareUser data
    useEffect(() => {
        getRareUsers()
    }, [])

    useEffect(() => {
        const matchingRareUsers = rareUsers.filter(rareUser => rareUser.name.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(matchingRareUsers)
    }, [searchTerms])


    useEffect(() => {
        setFiltered(rareUsers)
    }, [rareUsers])

    return (
        <div style={{ marginTop: "2rem"}}>
            <button onClick={() => history.push("/rareUsers/create")}>
                Create new Animal
            </button>
            <div className="rareUsers">
                {
                    filteredRareUsers.map(rareUser => <RareUser key={rareUser.id} rareUser={rareUser} />)
                }
            </div>
        </div>
    )
}