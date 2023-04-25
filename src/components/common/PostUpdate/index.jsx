import React, { useState, useMemo } from "react";
import "./index.scss";
import { getStatus } from "../../../api/FirestoreAPI";
import { Modal, Button } from "antd";
import { postStatusToFirebase } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { getUniqueId } from "../../../helpers/getUniqueId";

export const PostStatus = ({ currentUser }) => {
    const [modal1Open, setModal1Open] = useState(false);
    const [status, setStatus] = useState("");
    const [allStatuses, setAllStatuses] = useState([]);

    const sendStatus = (status) => {
        const object = {
            status: status,
            timestamp: getCurrentTimeStamp("LLL"),
            email: currentUser.email || "",
            userName: currentUser.name || "",
            postID: getUniqueId(),
        };
        postStatusToFirebase(object);
        setModal1Open(false);
        setStatus("");
    };

    useMemo(() => {
        getStatus(setAllStatuses);
    }, []);

    return (
        <div className="post-status-main">
            <div className="post-status">
                <button
                    className="open-post-modal"
                    onClick={() => setModal1Open(true)}
                >
                    Start a post
                </button>
                <Modal
                    title="Create a post"
                    style={{ top: 20 }}
                    open={modal1Open}
                    onCancel={() => setModal1Open(false)}
                    footer={[
                        <Button
                            className="post-btn"
                            key="submit"
                            type="primary"
                            onClick={() => sendStatus(status)}
                            disabled={status.length === 0}
                        >
                            Post
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
                </Modal>
            </div>
            <div className="posts-container">
                {allStatuses.map((post) => (
                    <PostsCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
};
