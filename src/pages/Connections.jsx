import React, { useEffect, useState } from "react";
import { ConnectionsComponent } from "../components/ConnectionsComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/common/Loader";

export const Connections = ({ currentUser }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if (!res?.accessToken) {
                navigate("/");
            } else {
                setLoading(false);
            }
        });
    }, []);
    return loading ? (
        <Loader />
    ) : (
        <ConnectionsComponent currentUser={currentUser} />
    );
};
