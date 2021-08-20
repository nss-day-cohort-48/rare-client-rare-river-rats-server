import React, { useContext, useEffect } from "react"
import { ProfileContext } from "./ProfileProvider.js"
import "./Profile.css"


export const Profile = () => {

    const { profile, getProfile } = useContext(ProfileContext)

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div style={{ marginTop: "2rem" }}>

            {profile.map((profile) => (
                <div className="profile" id={`profile--${profile.id}`} key={profile.id}>
                    <div className="profile__name">Name: {profile.user.first_name} {profile.user.last_name}</div>

                    <img src={profile.profile_image_url} alt="ProfilePic" />

                    <div className="profile__bio">Bio:  {profile.bio}</div>

                    <div className="profile__username">Username: {profile.user.username}</div>
                    <div>Email: {profile.user.email}</div>

                    <div>Profile Type: {
                        profile.is_staff
                    }
                    </div>

                </div>
            ))
            }
        </div>
    );
};
