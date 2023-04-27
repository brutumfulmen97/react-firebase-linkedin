import { firestore } from "../firebaseConfig";
import {
    addDoc,
    collection,
    onSnapshot,
    doc,
    updateDoc,
    query,
    where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const postsRef = collection(firestore, "posts");
const usersRef = collection(firestore, "users");

function postStatusToFirebase(data) {
    addDoc(postsRef, data)
        .then((res) => toast.success("Status posted successfully"))
        .catch((err) => toast.error("Error posting status"));
}

function getStatus(setAllStatuses) {
    onSnapshot(postsRef, (response) => {
        setAllStatuses(
            response.docs.map((post) => {
                return { ...post.data(), id: post.id };
            })
        );
    });
}

function postUserData(data) {
    addDoc(usersRef, data)
        .then(() => {})
        .catch((err) => {
            console.log(err);
        });
}

function getCurrentUser(setCurrentUser) {
    onSnapshot(usersRef, (response) => {
        setCurrentUser(
            response.docs
                .map((user) => {
                    return { ...user.data(), userID: user.id };
                })
                .filter(
                    (user) =>
                        user.email ===
                        JSON.parse(localStorage.getItem("user-email"))
                )[0]
        );
    });
}

function editProfile(id, data) {
    let userToEdit = doc(usersRef, id);
    updateDoc(userToEdit, data)
        .then(() => {
            toast.success("Profile edited successfully");
        })
        .catch((err) => {
            console.log(err);
        });
}

function getSingleUser(setCurrentUser, email) {
    const singleUserQuery = query(usersRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
        setCurrentUser(
            response.docs.map((user) => {
                return { ...user.data(), id: user.id };
            })[0]
        );
    });
}

function getSingleStatus(setAllStatuses, id) {
    const singlePostQuery = query(postsRef, where("userID", "==", id));
    onSnapshot(singlePostQuery, (response) => {
        setAllStatuses(
            response.docs.map((post) => {
                return { ...post.data(), userID: post.id };
            })
        );
    });
}

export {
    postStatusToFirebase,
    getStatus,
    postUserData,
    getCurrentUser,
    editProfile,
    getSingleStatus,
    getSingleUser,
};
