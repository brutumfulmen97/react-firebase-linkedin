import React, { useState, useMemo, useEffect } from "react";
import "./index.scss";
import { getStatus } from "../../../api/FirestoreAPI";
import { Modal, Button } from "antd";
import { postStatusToFirebase, editPost } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { getUniqueId } from "../../../helpers/getUniqueId";
import { useNavigate } from "react-router-dom";
import { AiOutlinePicture } from "react-icons/ai";
import { uploadPostImage } from "../../../api/ImageUpload";

export const PostStatus = ({ currentUser }) => {
    const [modal1Open, setModal1Open] = useState(false);
    const [status, setStatus] = useState("");
    const [allStatuses, setAllStatuses] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentPost, setCurrentPost] = useState({});
    const [imageUrl, setImageUrl] = useState("");
    const [postImage, setPostImage] = useState("");

    const getImage = (e) => {
        uploadPostImage(e.target.files[0], setImageUrl);
    };

    const navigate = useNavigate();

    const sendStatus = (status) => {
        const object = {
            status: status,
            timestamp: getCurrentTimeStamp("LLL"),
            email: currentUser.email || "",
            userName: currentUser.name || "",
            postID: getUniqueId(),
            userID: currentUser.userID,
            imageUrl: imageUrl,
        };
        postStatusToFirebase(object);
        setModal1Open(false);
        setStatus("");
        setImageUrl("");
        setPostImage("");
    };

    const editStatus = (status) => {
        let object = {};
        if (imageUrl == "") {
            object = {
                ...currentPost,
                status: status,
            };
        } else {
            object = {
                ...currentPost,
                imageUrl: imageUrl,
                status: status,
            };
        }
        editPost(currentPost.id, object);
        setIsEdit(false);
        setModal1Open(false);
        setStatus("");
        setImageUrl("");
        setPostImage("");
    };

    const getEditData = (post) => {
        setModal1Open(true);
        setCurrentPost(post);
        setPostImage(post?.imageUrl);
        setStatus(post?.status);
        setIsEdit(true);
    };

    useEffect(() => {
        setPostImage(imageUrl);
    }, [imageUrl]);

    useMemo(() => {
        getStatus(setAllStatuses);
    }, []);

    return (
        <div className="post-status-main">
            <div className="profile-info-section">
                <div className="cover-gradient"></div>
                <img
                    className="profile-image-big"
                    src={currentUser.imageUrl}
                    alt="profile photo"
                    onClick={() => {
                        navigate("/profile", {
                            state: {
                                id: currentUser.userID,
                                email: currentUser.email,
                            },
                        });
                    }}
                />
                <p
                    onClick={() => {
                        navigate("/profile", {
                            state: {
                                id: currentUser.userID,
                                email: currentUser.email,
                            },
                        });
                    }}
                >
                    {currentUser.name}
                </p>
                <p>{currentUser.headline}</p>
            </div>
            <div className="post-status">
                <img
                    className="profile-image"
                    src={currentUser.imageUrl}
                    onClick={() => {
                        navigate("/profile", {
                            state: {
                                id: currentUser.userID,
                                email: currentUser.email,
                            },
                        });
                    }}
                    alt="profile photo"
                />
                <button
                    className="open-post-modal"
                    onClick={() => {
                        setModal1Open(true);
                        setIsEdit(false);
                    }}
                >
                    Start a post
                </button>
                <Modal
                    title={isEdit ? "Edit Post" : "Create Post"}
                    style={{ top: 20 }}
                    open={modal1Open}
                    onOk={() => {
                        setModal1Open(false);
                        setStatus("");
                    }}
                    onCancel={() => {
                        setPostImage("");
                        setModal1Open(false);
                        setStatus("");
                    }}
                    footer={[
                        <Button
                            className="post-btn"
                            key="submit"
                            type="primary"
                            style={{ background: "#0a66c2", color: "white" }}
                            onClick={() => {
                                if (isEdit) {
                                    editStatus(status);
                                } else {
                                    sendStatus(status);
                                }
                            }}
                            disabled={status.length === 0}
                        >
                            {isEdit ? "Edit" : "Post"}
                        </Button>,
                    ]}
                >
                    <hr />
                    <textarea
                        className="modal-input"
                        rows={5}
                        columns={30}
                        placeholder="What do you want to talk about?"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                        }}
                    ></textarea>
                    <img src={postImage} className="post-image-modal" />
                    <label htmlFor="post-photo">
                        <AiOutlinePicture
                            size={45}
                            color="#212121"
                            className="picture-icon"
                        />
                    </label>
                    <input
                        id="post-photo"
                        hidden
                        type="file"
                        onChange={getImage}
                    />
                    <hr className="modal-hr" />
                </Modal>
            </div>
            <div className="posts-container">
                {allStatuses.map((post) => (
                    <PostsCard
                        post={post}
                        key={post.postID}
                        getEditData={getEditData}
                    />
                ))}
            </div>
        </div>
    );
};
