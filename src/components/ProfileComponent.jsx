import React, { useState } from "react";
import { ProfileCard } from "./common/ProfileCard";
import { ProfileEdit } from "./common/ProfileEdit";

export const ProfileComponent = ({ currentUser }) => {
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => {
        setIsEdit((prev) => !prev);
    };
    return (
        <div style={{ background: "#f3f2ef", paddingBottom: "30px" }}>
            {isEdit ? (
                <ProfileEdit currentUser={currentUser} onEdit={onEdit} />
            ) : (
                <ProfileCard currentUser={currentUser} onEdit={onEdit} />
            )}
        </div>
    );
};
