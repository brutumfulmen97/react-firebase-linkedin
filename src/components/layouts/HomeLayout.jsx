import React from "react";
import { Home } from "../../pages/Home";
import { Topbar } from "../common/Topbar";

export const HomeLayout = () => {
    return (
        <>
            <Topbar />
            <Home />
        </>
    );
};
