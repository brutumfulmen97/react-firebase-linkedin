import React, { useMemo, useState } from "react";
import { Connections } from "../pages/Connections";
import { Topbar } from "../components/common/Topbar";
import { getCurrentUser } from "../api/FirestoreAPI";

export const ConnectionsLayout = () => {
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => getCurrentUser(setCurrentUser), []);
    return (
        <>
            <Topbar currentUser={currentUser} />
            <Connections currentUser={currentUser} />
        </>
    );
};
