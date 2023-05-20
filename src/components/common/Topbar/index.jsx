import React, { useState, useEffect } from "react";
import "./index.scss";
import {
    AiOutlineHome,
    AiOutlineUserSwitch,
    AiOutlineMessage,
    AiOutlineBell,
} from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ProfilePopup } from "../ProfilePopup";
import { SearchUsers } from "../SearchUsers";

export const Topbar = ({ currentUser }) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [pathname, setPathname] = useState(window.location.pathname);
    const navigate = useNavigate();
    const goToRoute = (route) => {
        navigate(route);
    };

    return (
        <div className="topbar-main">
            <div className="logo-search">
                <svg
                    className="topbar-logo"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    onClick={() => {
                        goToRoute("/home");
                    }}
                >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
                <SearchUsers />
            </div>
            <div className="topbar-icons">
                <AiOutlineHome
                    className={pathname === "/home" ? "active" : ""}
                    size={50}
                    onClick={() => {
                        goToRoute("/home");
                    }}
                />
                <AiOutlineUserSwitch
                    className={pathname === "/connections" ? "active" : ""}
                    size={50}
                    onClick={() => {
                        navigate("/connections");
                    }}
                />
                <AiOutlineMessage
                    size={50}
                    onClick={() => {
                        goToRoute("/");
                    }}
                />
                <BsBriefcase
                    size={50}
                    onClick={() => {
                        goToRoute("/");
                    }}
                />
                <AiOutlineBell
                    size={50}
                    onClick={() => {
                        goToRoute("/");
                    }}
                />
                <div
                    className="topbar-user"
                    onClick={() => {
                        setPopupOpen(!popupOpen);
                    }}
                >
                    <i className="fa-regular fa-user"></i>
                    {popupOpen && <ProfilePopup />}
                </div>
            </div>
        </div>
    );
};
