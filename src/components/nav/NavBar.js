import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
    const history = useHistory()

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
                <div className="navbar__name"> Rare</div>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">All Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts">My Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Category Manager</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tags">Tag Manager</Link>
            </li>
            <li className="navbar__item">
                    <Link className="nav-link" to="/rare_users">Users</Link>
                </li>
            <li className="navbar__item">
                    <Link className="nav-link" to="/profiles">Profiles</Link>
                </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/login"
                    onClick={ //allows the user to logout by removing the current user from the local storage
                        (event) => {
                            localStorage.removeItem("rare_token")
                        }
                    }
                >Logout</Link>
            </li>
        </ul>
    )
}
