import React, { useState } from "react";
import "./index.scss";
import { editProfile } from "../../../api/FirestoreAPI";

export const ProfileEdit = ({ currentUser, onEdit }) => {
    const [editInputs, setEditInputs] = useState({});

    const getInput = (e) => {
        let { name, value } = e.target;
        let input = { [name]: value };
        setEditInputs((prev) => {
            return { ...prev, ...input };
        });
    };

    const updateProfileInfo = () => {
        editProfile(currentUser.userID, editInputs);
        onEdit();
    };

    return (
        <div className="profile-card">
            <h1>Edit Profile</h1>
            <div className="edit-btn">
                <button onClick={onEdit}>Go back</button>
            </div>
            <div className="profile-edit-inputs">
                <input
                    onChange={getInput}
                    name="name"
                    type="text"
                    placeholder="Name"
                />
                <input
                    onChange={getInput}
                    name="headline"
                    type="text"
                    placeholder="Headline"
                />
                <input
                    onChange={getInput}
                    name="location"
                    type="text"
                    placeholder="Location"
                />
                <input
                    onChange={getInput}
                    name="company"
                    type="text"
                    placeholder="Company"
                />
                <input
                    onChange={getInput}
                    name="college"
                    type="text"
                    placeholder="College"
                />
                <button className="save-btn" onClick={updateProfileInfo}>
                    Save
                </button>
            </div>
        </div>
    );
};
