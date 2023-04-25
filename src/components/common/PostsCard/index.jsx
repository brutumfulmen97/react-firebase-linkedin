import React from "react";
import "./index.scss";

const PostsCard = ({ post }) => {
    return (
        <div className="posts-card">
            <p>{post.userName}</p>
            <p>{post.timestamp || "no timestamp"}</p>
            {/* <p>{post.email}</p> */}
            <p>{post.status}</p>
        </div>
    );
};

export default PostsCard;
