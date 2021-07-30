import React from "react"
import "./RareUser.css"
import { Link } from "react-router-dom"

export default ({ rare_users }) => (
    <section className="rare_user">
        <h3 className="rare_user__first_name">
            <Link to={`/rare_users/${rare_users.id}`}>
                { rare_users.first_name }
            </Link>
        </h3>
        <div className="rare_user__email">{ rare_users.email }</div>
    </section>
)