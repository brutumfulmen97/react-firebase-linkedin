import React from "react";
import { PostStatus } from "./common/PostUpdate";
import "../Sass/HomeComponent.scss";

export const HomeComponent = ({ currentUser }) => {
    return (
        <div
            className="home-component"
            style={{ background: "#f3f2ef", paddingBottom: "30px" }}
        >
            <PostStatus currentUser={currentUser} />
        </div>
    );
};
