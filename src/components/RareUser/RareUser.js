import React from "react"
import "./RareUser.css"
import { Link } from "react-router-dom"

export default ({ rare_user }) => (
    <section className="rare_user">
        <h3 className="rare_user__first_qname">
            <Link to={`/rare_users/${rare_user.id}`}>
                { rare_user.name }
            </Link>
        </h3>
        <div className="rare_user__email">{ rare_user.email }</div>
    </section>
)