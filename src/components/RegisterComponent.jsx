import React, { useState } from "react";
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import "../Sass/RegisterComponent.scss";
import { toast } from "react-toastify";
import { postUserData } from "../api/FirestoreAPI";
import { getUniqueId } from "../helpers/getUniqueId";

export const RegisterComponent = () => {
    const [credentials, setCredentials] = useState({});

    const register = async () => {
        try {
            let res = await RegisterAPI(
                credentials.email,
                credentials.password
            );
            toast.success("Account Created");
            postUserData({
                userID: getUniqueId(),
                name: credentials.name,
                email: credentials.email,
            });
            navigate("/home");
            localStorage.setItem("user-email", JSON.stringify(res.user.email));
        } catch (error) {
            toast.error("Cannot Create Account");
            console.log(error);
        }
    };

    const googleLogin = async () => {
        try {
            let res = GoogleSignInAPI();
            toast.success("Signed in to LinkedIn with Google");
            await res.then((data) => {
                localStorage.setItem(
                    "user-email",
                    JSON.stringify(data.user.email)
                );
                postUserData({
                    userID: getUniqueId(),
                    name: data.user.displayName,
                    email: data.user.email,
                });
            });
            navigate("/home");
        } catch (err) {
            toast.error("Please Check your credentials");
        }
    };

    const navigate = useNavigate();

    function togglePassword(e) {
        let password = document.querySelector(".pw");
        if (password.type === "password") {
            password.type = "text";
            e.target.textContent = "hide";
        } else {
            password.type = "password";
            e.target.textContent = "show";
        }
    }

    return (
        <div className="register-wrapper">
            <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
            </div>
            <h1 className="title">Make the most of your professional life</h1>
            <div className="register-form">
                <div className="login-inputs">
                    <input
                        className="common-input"
                        placeholder="Your Name"
                        type="text"
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                name: e.target.value,
                            })
                        }
                    />
                    <input
                        className="common-input"
                        placeholder="Email"
                        type="email"
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                email: e.target.value,
                            })
                        }
                    />
                    <input
                        className="common-input pw"
                        placeholder="Password (6 or more characters)"
                        type="password"
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                password: e.target.value,
                            })
                        }
                    />
                    <button
                        className="show-btn"
                        onClick={(e) => togglePassword(e)}
                    >
                        show
                    </button>
                </div>
                <button className="login-btn" onClick={register}>
                    Agree & Join
                </button>
                <div className="separator">or</div>
                <button className="google-btn" onClick={googleLogin}>
                    <i className="fa-brands fa-google"></i> Continue with Google
                </button>
                <p className="new-acc">
                    Already on LinkedIn?
                    <span
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
};
