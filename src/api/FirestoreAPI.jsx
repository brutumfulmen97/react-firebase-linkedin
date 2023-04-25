import { firestore } from "../firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
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

export { postStatusToFirebase, getStatus, postUserData, getCurrentUser };
