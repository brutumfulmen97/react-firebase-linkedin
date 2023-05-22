import React, { useState, useEffect } from "react";
import "./index.scss";
import { getConnectionsByUser } from "../../../api/FirestoreAPI";
import { useNavigate } from "react-router-dom";

export const ConnectedUsers = ({ user, getCurrentUser, currentUser }) => {
    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getConnectionsByUser(currentUser.userID, user.userID, setIsConnected);
    }, [currentUser.userID]);
    if (isConnected) return null;
    if (user.userID === currentUser.userID) return;
    return (
        <div className="connection">
            <div className="cover-gradient"></div>
            <img
                src={user.imageUrl}
                className="profile-pic"
                alt="profile picture"
                onClick={() => {
                    navigate("/profile", {
                        state: {
                            id: user.userID,
                            email: user.email,
                        },
                    });
                }}
            />
            <p
                onClick={() => {
                    navigate("/profile", {
                        state: {
                            id: user.userID,
                            email: user.email,
                        },
                    });
                }}
            >
                {user.name}
            </p>
            <p>{user.headline}</p>
            <button
                className="connect-btn"
                onClick={() => getCurrentUser(user.userID)}
            >
                <i className="fa-solid fa-link"></i> Connect
            </button>
        </div>
    );
};
