import React, { useState } from "react";
import "./index.scss";
import { Modal, Button } from "antd";

export const PostStatus = () => {
    const [modal1Open, setModal1Open] = useState(true);
    const [status, setStatus] = useState("");

    const sendStatus = () => {
        setModal1Open(false);
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
                            onClick={sendStatus}
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
                        onChange={(e) => setStatus(e.target.value)}
                    ></textarea>
                </Modal>
            </div>
        </div>
    );
};
