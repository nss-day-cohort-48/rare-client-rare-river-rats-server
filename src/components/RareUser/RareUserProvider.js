import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const RareUserContext = createContext();

// This component establishes what data can be used.
export const RareUserProvider = (props) => {
  const [rare_users, setRare_Users] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");

  const getRareUsers = () => {
    return fetch("http://localhost:8000/rare_users", {
      headers:{
          "Authorization": `Token ${localStorage.getItem("rare_token")}`
      }
  })
      .then((res) => res.json())
      .then(setRare_Users);
  };

  const addRareUser = (rareUserObj) => {
    return fetch("http://localhost:8000/rare_users", {
      method: "POST",
      headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("rare_token")}`
      },
      body: JSON.stringify(rareUserObj),
    }).then(getRareUsers);
  };

  const getRareUserById = (id) => {
    return fetch(`http://localhost:8000/rare_users/${id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const updateRareUser = (rare_user) => {
    return fetch(`http://localhost:8000/rare_users/${rare_user.id}`, {
      method: "PUT",
      headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("lu_token")}`
      },
      body: JSON.stringify(rare_user),
    }).then(getRareUsers);
  };

  const releaseRareUser = (rareUserId) => {
    return fetch(`http://localhost:8000/rare_users/${rareUserId}`, {
      method: "DELETE",
      headers:{
          "Authorization": `Token ${localStorage.getItem("lu_token")}`,
          "Content-Type": "application/json"
      }
  })
  .then(getRareUserById);
  };

  return (
    <RareUserContext.Provider
      value={{
        rare_users,
        searchTerms,
        setSearchTerms,
        getRareUsers,
        addRareUser,
        releaseRareUser,
        getRareUserById,
        updateRareUser,
      }}
    >
      {props.children}
    </RareUserContext.Provider>
  );
};
