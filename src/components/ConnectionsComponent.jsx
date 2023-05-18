import React, { useState, useEffect } from "react";
import "../Sass/ConnectionsComponent.scss";
import { getUsers, addConnection } from "../api/FirestoreAPI";
import { ConnectedUsers } from "./common/ConnectedUsers";

export const ConnectionsComponent = ({ currentUser }) => {
    const [users, setUsers] = useState([]);

    const getCurrentUser = (id) => {
        addConnection(currentUser.userID, id);
    };

    useEffect(() => {
        getUsers(setUsers);
    }, []);

    return (
        <div style={{ background: "#f3f2ef", paddingBottom: "30px" }}>
            {/* <p className="connections-title">Connections</p> */}
            <div className="connections-main">
                {users.map((user) => (
                    <ConnectedUsers
                        user={user}
                        key={user.userID}
                        getCurrentUser={getCurrentUser}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </div>
    );
};
