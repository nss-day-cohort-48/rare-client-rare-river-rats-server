import React, { useEffect, useContext } from "react"
import { PostContext } from "../posts/PostProvider.js"
import { ProfileContext } from "./ProfileProvider.js"
import "./Profile.css"

export const Profile = () => {
    const { profile, getProfile } = useContext(ProfileContext)
    const { post } = useContext(PostContext)

    const CurrentProfile = parseInt(localStorage.getItem("rare_user"))

    useEffect(() => {
        getProfile()
    }, [])

    return (
        profile.map(profile => {
            if (CurrentProfile === profile.id) {
                return (
                    <article className="profile">
                        <header>
                            <img className="profile__img" src={profile.profile_image_url}/><h1>Your Profile</h1>
                        </header>
                        <section className="profile__info">
                            <header className="profile__header">
                                <h3>Your Info</h3>
                            </header>
                            <div className="profile__name">
                            Welcome: {profile.rare_user && profile.rare_user.user.first_name} {" "} {profile.rare_user && profile.rare_user.user.last_name}
                </div>
                <div className="profile__username">Username: {profile.rare_user && profile.rare_user.user.username}</div>
                <div className="profile__bio">About you: {profile.rare_user && profile.rare_user.bio}</div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Your Posts</h3>
                </header>
                <div className="registrations">
                    {
                        profile.post.map(event => {
                            return <div key={event.id} className="registration">
                                <div className="registration__game">{post.game.title}</div>
                                <div>{post.description}</div>
                                <div>
                                    {post.date} @ {post.user}
                                </div>
                            </div>
                        })
                    }
                </div>
            </section>
                        <section className="profile__games">
                            <header className="games__header">
                                <h3>Your Subscriptons</h3>
                            </header>
                            <div className="games">

                            </div>
                        </section>
                    </article>

                )
            }
        })

    )
}
