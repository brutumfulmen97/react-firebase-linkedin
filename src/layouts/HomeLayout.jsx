import React, { useMemo, useState } from "react";
import { Home } from "../pages/Home";
import { Topbar } from "../components/common/Topbar";
import { getCurrentUser } from "../api/FirestoreAPI";

export const HomeLayout = () => {
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => getCurrentUser(setCurrentUser), []);
    return (
        <>
            <Topbar currentUser={currentUser} />
            <Home currentUser={currentUser} />
        </>
    );
};
