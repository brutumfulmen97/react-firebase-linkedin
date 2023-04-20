import React, { useEffect } from "react";
import { LoginComponent } from "../components/LoginComponent";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if (res?.accessToken) navigate("/home");
        });
    }, []);
    return <LoginComponent />;
};
