import React, { useMemo, useState } from "react";
import "./index.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import {
    likePost,
    getLikesByUser,
    postComment,
    getComments,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";

export const LikeButton = ({ userID, postID, currentUser }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const getComment = (e) => {
        setComment(e.target.value);
    };

    const addComment = (comment) => {
        postComment(
            postID,
            comment,
            getCurrentTimeStamp("LLL"),
            currentUser.name
        );
        setComment("");
    };

    const handleLike = () => {
        likePost(userID, postID, isLiked);
    };

    useMemo(() => {
        getLikesByUser(userID, postID, setLikeCount, setIsLiked);
        getComments(postID, setComments);
    }, [isLiked, likeCount]);

    return (
        <>
            <div className="like-comment-count">
                <p className="count-text">
                    {likeCount} like{likeCount === 1 ? "" : "s"}
                </p>
                <p className="count-text">
                    {comments.length} comment{comments.length == 1 ? "" : "s"}
                </p>
            </div>
            <hr className="line" />
            <div className="like-comment">
                <div className="like-container" onClick={handleLike}>
                    {isLiked ? (
                        <AiFillHeart size={30} color={"red"} />
                    ) : (
                        <AiOutlineHeart size={30} />
                    )}
                    <p className="like-text">Like</p>
                </div>
                <div
                    className="like-container"
                    onClick={() => {
                        setShowComment(!showComment);
                    }}
                >
                    <AiOutlineComment size={30} />
                    <p className="like-text">Comment</p>
                </div>
            </div>

            {showComment && (
                <div className="comment-container">
                    <input
                        onChange={getComment}
                        type="text"
                        placeholder="Add a comment..."
                        className="comment-input"
                        value={comment}
                    />
                    {comment !== "" && (
                        <button
                            onClick={() => {
                                addComment(comment);
                            }}
                        >
                            Post
                        </button>
                    )}

                    <div className="comments">
                        {comments.length > 0 &&
                            comments.map((comment) => (
                                <div className="comment" key={comment.id}>
                                    <p className="comment-name">
                                        {comment.name}
                                    </p>
                                    <p className="comment-text">
                                        {comment.comment}
                                    </p>
                                    <p className="comment-timestamp">
                                        {comment.timestamp}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};
