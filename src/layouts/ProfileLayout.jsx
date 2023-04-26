import React, { useState, useMemo } from "react";
import { getCurrentUser } from "../api/FirestoreAPI";
import { Topbar } from "../components/common/Topbar";
import { Profile } from "../pages/Profile";

export const ProfileLayout = () => {
    const [currentUser, setCurrentUser] = useState({});

    useMemo(() => getCurrentUser(setCurrentUser), []);
    return (
        <div>
            <Topbar />
            <Profile currentUser={currentUser} />
        </div>
    );
};
