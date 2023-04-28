import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "../LikeButton";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import "./index.scss";

const PostsCard = ({ post, id }) => {
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, []);

    const navigate = useNavigate();

    return (
        <div className="posts-card" key={id}>
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
            <p>{post.timestamp || "no timestamp"}</p>
            {/* <p>{post.email}</p> */}
            <p>{post.status}</p>
            <LikeButton userID={currentUser.userID} postID={post.postID} />
        </div>
    );
};

export default PostsCard;
