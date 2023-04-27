import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const PostsCard = ({ post, id }) => {
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
        </div>
    );
};

export default PostsCard;
