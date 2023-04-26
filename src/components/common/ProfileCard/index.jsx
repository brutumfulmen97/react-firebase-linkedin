import React, { useState, useMemo } from "react";
import { getStatus } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import "./index.scss";

export const ProfileCard = ({ currentUser, onEdit }) => {
    const [allStatuses, setAllStatuses] = useState([]);

    useMemo(() => {
        getStatus(setAllStatuses);
    }, []);
    return (
        <>
            <div className="profile-card">
                <div className="edit-btn">
                    <button onClick={onEdit}>Edit</button>
                </div>
                <h3>{currentUser.name}</h3>
                <p>{currentUser.email}</p>
                <p>{currentUser.headline}</p>
            </div>

            <div className="posts-container">
                {allStatuses
                    .filter((item) => item.email === currentUser.email)
                    .map((post) => (
                        <PostsCard post={post} key={post.id} />
                    ))}
            </div>
        </>
    );
};
