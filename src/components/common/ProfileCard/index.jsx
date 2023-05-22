import React, { useState, useMemo, useEffect } from "react";
import {
    getSingleStatus,
    getSingleUser,
    editProfile,
} from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { useLocation } from "react-router-dom";
import { FileUploadModal } from "../fileUploadModal";
import "./index.scss";

export const ProfileCard = ({ currentUser, onEdit }) => {
    const location = useLocation();
    const [allStatuses, setAllStatuses] = useState([]);
    const [currentProfile, setCurrentProfile] = useState({});
    const [image, setImage] = useState({});
    const [imageUrl, setImageUrl] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const getImage = (e) => {
        setImage(e.target.files[0]);
    };

    useMemo(() => {
        if (location?.state?.id) {
            getSingleStatus(setAllStatuses, location?.state?.id);
        }
        if (location?.state?.email) {
            getSingleUser(setCurrentProfile, location?.state?.email);
        }
    }, [location?.state?.id]);

    useEffect(() => {
        if (imageUrl) {
            editProfile(currentUser.userID, {
                ...currentUser,
                imageUrl,
            });
        }
    }, [imageUrl]);

    return (
        <>
            <div className="profile-card">
                <FileUploadModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    image={image}
                    setImageUrl={setImageUrl}
                    getImage={getImage}
                    setImage={setImage}
                />
                <img
                    className="profile-image"
                    onClick={() => setModalOpen(true)}
                    src={
                        Object.values(currentProfile).length === 0
                            ? currentUser.imageUrl
                            : currentProfile?.imageUrl
                    }
                    alt="profile picture"
                />
                <div className="cover"></div>
                {currentUser.userID === location?.state?.id && (
                    <div className="edit-btn">
                        <i onClick={onEdit} className="fa fa-pencil"></i>
                    </div>
                )}
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
