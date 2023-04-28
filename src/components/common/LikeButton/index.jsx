import React, { useMemo, useState } from "react";
import "./index.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { likePost, getLikesByUser } from "../../../api/FirestoreAPI";

export const LikeButton = ({ userID, postID }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        likePost(userID, postID, isLiked);
    };

    useMemo(() => {
        getLikesByUser(userID, postID, setLikeCount, setIsLiked);
    }, [isLiked, likeCount]);

    return (
        <div className="like-container" onClick={handleLike}>
            {isLiked ? (
                <AiFillHeart size={30} color={"red"} />
            ) : (
                <AiOutlineHeart size={30} />
            )}
            <p className="like-text">{likeCount}</p>
        </div>
    );
};
