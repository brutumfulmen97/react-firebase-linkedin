import React, { useState, useMemo } from "react";
import { onLogout } from "../../../api/AuthAPI";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../api/FirestoreAPI";

export const ProfilePopup = () => {
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, []);
    const navigate = useNavigate();
    console.log(currentUser);

    return (
        <div className="popup-card">
            {/* <ul className="popup-options">
                <li className="popup-option" onClick={onLogout}>
                    Logout
                </li>
                <li
                    className="popup-option"
                    onClick={() =>
                        navigate("/profile", {
                            state: {
                                id: currentUser.userID,
                                email: currentUser.email,
                            },
                        })
                    }
                >
                    Profile
                </li>
            </ul> */}
            <p className="popup-name">{currentUser.name}</p>
            <p className="popup-headline">{currentUser.headline}</p>
            <button
                className="popup-profile-btn"
                onClick={() => {
                    navigate("/profile", {
                        state: {
                            id: currentUser.userID,
                            email: currentUser.email,
                        },
                    });
                }}
            >
                View profile
            </button>
            <hr />
            <p className="signout-btn" onClick={onLogout}>
                Sign Out
            </p>
        </div>
    );
};
