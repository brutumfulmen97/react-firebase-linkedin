import React from "react";
import "./index.scss";
import { Modal, Button } from "antd";
import { uploadImage } from "../../../api/ImageUpload";

export const FileUploadModal = ({
    modalOpen,
    setModalOpen,
    image,
    setImage,
    setImageUrl,
    getImage,
}) => {
    return (
        <Modal
            title="Add a profile photo"
            style={{ top: 20 }}
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            footer={[
                <Button
                    className="upload-btn"
                    onClick={() => {
                        uploadImage(image, setImageUrl);
                        setModalOpen(false);
                        setImage({});
                    }}
                    key="submit"
                    type="primary"
                    disabled={image.name === undefined}
                >
                    Upload
                </Button>,
            ]}
        >
            <hr />
            <div className="file-input">
                <label htmlFor="image-upload">Select an image</label>
                <input
                    type={"file"}
                    onChange={getImage}
                    id="image-upload"
                    hidden
                />
                <p>{image.name}</p>
            </div>
        </Modal>
    );
};
