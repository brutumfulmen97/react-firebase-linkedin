import React from "react";
import { PostStatus } from "./common/PostUpdate";
import "../Sass/HomeComponent.scss";

export const HomeComponent = () => {
    return (
        <div className="home-component">
            <PostStatus />
        </div>
    );
};
