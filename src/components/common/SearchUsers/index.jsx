import React, { useState, useEffect } from "react";
import "./index.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { getUsers } from "../../../api/FirestoreAPI";
import { useNavigate } from "react-router-dom";

export const SearchUsers = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [inputIsFocused, setInputIsFocused] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getUsers(setUsers);
    }, []);

    useEffect(() => {
        if (search === "") {
            setUsers([]);
            return;
        }
        const filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
        setUsers(filteredUsers);
    }, [search]);

    console.log("render");
    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-user"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setInputIsFocused((prev) => !prev)}
                onBlur={() => {
                    setTimeout(() => {
                        setInputIsFocused((prev) => !prev);
                    }, 200);
                }}
            />
            <AiOutlineSearch className="search-icon" size={20} />
            {inputIsFocused && search.length > 0 && (
                <div className="search-results">
                    {users.map((user) => (
                        <div
                            key={user.userID}
                            className="search-result"
                            onClick={() => {
                                console.log("djes");
                                navigate("/profile", {
                                    state: {
                                        id: user.userID,
                                        email: user.email,
                                    },
                                });
                            }}
                        >
                            <img
                                src={user.imageUrl}
                                alt="profile picture"
                                className="search-profile-pic"
                            />
                            <p className="search-name">{user.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
