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
            <h4>Edit info</h4>
            <div className="edit-btn">
                <i className="fa-solid fa-x" onClick={onEdit}></i>
            </div>
            <hr />
            <div className="profile-edit-inputs">
                <label htmlFor="name">Name</label>
                <input
                    onChange={getInput}
                    name="name"
                    type="text"
                    placeholder="Name"
                    defaultValue={currentUser.name}
                />
                <label htmlFor="headline">Headline</label>
                <input
                    onChange={getInput}
                    name="headline"
                    type="text"
                    placeholder="Headline"
                    defaultValue={currentUser.headline}
                />
                <label htmlFor="location">Location</label>
                <input
                    onChange={getInput}
                    name="location"
                    type="text"
                    placeholder="Location"
                    defaultValue={currentUser.location}
                />
                <label htmlFor="company">Company</label>
                <input
                    onChange={getInput}
                    name="company"
                    type="text"
                    placeholder="Company"
                    defaultValue={currentUser.company}
                />
                <label htmlFor="industry">Industry</label>
                <input
                    onChange={getInput}
                    name="industry"
                    type="text"
                    placeholder="Industry"
                    defaultValue={currentUser.industry}
                />
                <label htmlFor="college">College</label>
                <input
                    onChange={getInput}
                    name="college"
                    type="text"
                    placeholder="College"
                    defaultValue={currentUser.college}
                />
                <label htmlFor="website">Website</label>
                <input
                    onChange={getInput}
                    name="website"
                    type="text"
                    placeholder="Website"
                    defaultValue={currentUser.website}
                />
                <button className="save-btn" onClick={updateProfileInfo}>
                    Save
                </button>
            </div>
        </div>
    );
};
