import React, { useState } from "react";
import "./index.scss";
import { Modal, Button } from "antd";
import { postStatusToFirebase } from "../../../api/FirestoreAPI";

export const PostStatus = () => {
    const [modal1Open, setModal1Open] = useState(false);
    const [status, setStatus] = useState("");

    const sendStatus = (status) => {
        const object = {
            status: status || null,
        };
        postStatusToFirebase(object);
        setModal1Open(false);
        setStatus("");
    };

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
        </div>
    );
};
