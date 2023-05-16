import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "../LikeButton";
import { getCurrentUser, getUsers } from "../../../api/FirestoreAPI";
import "./index.scss";

const PostsCard = ({ post, id }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [users, setUsers] = useState([]);
    useMemo(() => {
        getCurrentUser(setCurrentUser);
        getUsers(setUsers);
    }, []);

    const imageLink = users
        .filter((user) => user.id === post.userID)
        .map((user) => user.imageUrl)[0];

    const navigate = useNavigate();

    return (
        <div className="posts-card" key={id}>
            <div className="image-name">
                <img
                    src={
                        imageLink ||
                        "https://www.w3schools.com/howto/img_avatar.png"
                    }
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

            <p className="post-status-text">{post.status}</p>
            <LikeButton
                userID={currentUser.userID}
                postID={post.postID}
                currentUser={currentUser}
            />
        </div>
    );
};

export default PostsCard;
