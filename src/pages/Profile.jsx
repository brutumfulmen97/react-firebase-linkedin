import React, { useState, useEffect } from "react";
import { ProfileComponent } from "../components/ProfileComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/common/Loader";

export const Profile = ({ currentUser }) => {
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
        <ProfileComponent currentUser={currentUser} />
    );
};
