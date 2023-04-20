import React, { useEffect, useState } from "react";
import { LoginComponent } from "../components/LoginComponent";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Loader } from "../components/common/Loader";

export const Login = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if (res?.accessToken) {
                navigate("/home");
            } else {
                setLoading(false);
            }
        });
    }, []);
    return loading ? <Loader /> : <LoginComponent />;
};
