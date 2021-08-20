import React, { useContext } from "react"
import { RareUserContext } from "../RareUser/RareUserProvider"
import "./RareUser.css"

export const RareUserSearch = () => {
  const { setSearchTerms } = useContext(RareUserContext)

  return (
    <>
      <div className="vertical-center">
        <div className="inputSearch">
          User Search:</div>
        <input type="text"
          className="input--search--box"
          onKeyUp={(event) => setSearchTerms(event.target.value)}
          placeholder="Search for a User... " />
      </div>
    </>
  )
}

// this component's sole responsibility is to capture the text from the user. As the user types, you must immediately update the searchTerms state variable in the parent component.