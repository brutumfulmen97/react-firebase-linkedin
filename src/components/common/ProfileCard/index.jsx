import React, { useState, useMemo } from "react";
import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { useLocation } from "react-router-dom";
import "./index.scss";

export const ProfileCard = ({ currentUser, onEdit }) => {
    const location = useLocation();
    const [allStatuses, setAllStatuses] = useState([]);
    const [currentProfile, setCurrentProfile] = useState({});

    useMemo(() => {
        if (location?.state?.id) {
            getSingleStatus(setAllStatuses, location?.state?.id);
        }
        if (location?.state?.email) {
            getSingleUser(setCurrentProfile, location?.state?.email);
        }
    }, [location?.state?.id]);

    return (
        <>
            <div className="profile-card">
                <div className="edit-btn">
                    <i onClick={onEdit} className="fa fa-pencil"></i>
                </div>
                <div className="profile-info">
                    <div className="left-info">
                        <h3>
                            {Object.values(currentProfile).length === 0
                                ? currentUser.name
                                : currentProfile?.name}
                        </h3>
                        <p className="profile-headline">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.headline
                                : currentProfile?.headline}
                        </p>
                        <p className="profile-location">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.location
                                : currentProfile?.location}
                        </p>
                    </div>
                    <div className="right-info">
                        <p className="profile-company">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.company
                                : currentProfile?.company}
                        </p>
                        <p className="profile-college">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.college
                                : currentProfile?.college}
                        </p>
                    </div>
                </div>
            </div>

            <div className="posts">
                {allStatuses.map((post) => (
                    <PostsCard post={post} key={post.postID} />
                ))}
            </div>
        </>
    );
};
