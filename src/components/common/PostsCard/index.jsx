import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "../LikeButton";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
    deletePost,
    getCurrentUser,
    getUsers,
    getConnectionsByUser,
} from "../../../api/FirestoreAPI";
import "./index.scss";

const PostsCard = ({ post, id, getEditData }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const [users, setUsers] = useState([]);
    useMemo(() => {
        getCurrentUser(setCurrentUser);
        getUsers(setUsers);
    }, []);

    const imageLink = users
        .filter((user) => user.userID === post.userID)
        .map((user) => user.imageUrl)[0];

    const navigate = useNavigate();

    useEffect(() => {
        getConnectionsByUser(currentUser.userID, post.userID, setIsConnected);
    }, [currentUser.userID]);

    if (!isConnected && currentUser.userID !== post.userID) return;

    return (
        <div className="posts-card" key={id}>
            <div className="image-name">
                <img
                    src={imageLink}
                    alt="profile image"
                    className="profile-photo"
                />
                <div className="name-timestamp">
                    <p
                        className="link-to-profile"
                        onClick={() =>
                            navigate("/profile", {
                                state: { id: post.userID, email: post.email },
                            })
                        }
                    >
                        {post.userName}
                    </p>
                    <p className="timestamp">
                        {post.timestamp || "no timestamp"}
                    </p>
                </div>
            </div>
            {currentUser.userID === post.userID &&
                location.pathname === "/home" && (
                    <>
                        <div
                            className="edit-icon"
                            onClick={() => {
                                getEditData(post);
                            }}
                        >
                            <BsPencil size={20} />
                        </div>
                        <div
                            className="delete-icon"
                            onClick={() => {
                                deletePost(post.id);
                            }}
                        >
                            <BsTrash size={20} />
                        </div>
                    </>
                )}
            <p className="post-status-text">{post.status}</p>
            {post?.imageUrl !== "" && (
                <img className="post-image" src={post.imageUrl} alt="" />
            )}
            <LikeButton
                userID={currentUser.userID}
                postID={post.postID}
                currentUser={currentUser}
            />
        </div>
    );
};

export default PostsCard;
