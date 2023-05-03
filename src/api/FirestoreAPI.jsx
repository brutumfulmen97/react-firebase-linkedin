import { firestore } from "../firebaseConfig";
import {
    addDoc,
    collection,
    onSnapshot,
    doc,
    updateDoc,
    query,
    where,
    setDoc,
    deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const postsRef = collection(firestore, "posts");
const usersRef = collection(firestore, "users");
const likesRef = collection(firestore, "likes");
const commentsRef = collection(firestore, "comments");

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

function getSingleUser(setCurrentProfile, email) {
    const singleUserQuery = query(usersRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
        setCurrentProfile(
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

function likePost(userID, postID, isLiked) {
    try {
        let docToLike = doc(likesRef, `${userID}_${postID}`);
        if (isLiked) {
            deleteDoc(docToLike);
        } else {
            setDoc(docToLike, { userID, postID });
        }
    } catch (err) {
        console.log(err);
    }
}

const getLikesByUser = (userID, postID, setLikeCount, setIsLiked) => {
    try {
        let likeQuery = query(likesRef, where("postID", "==", postID));
        onSnapshot(likeQuery, (response) => {
            let likes = response.docs.map((like) => like.data());
            let likesCount = likes.length;
            const isLiked = likes.some((like) => like.userID === userID);

            setLikeCount(likesCount);
            setIsLiked(isLiked);
        });
    } catch (err) {
        console.log(err);
    }
};

const postComment = (postID, comment, timestamp, name) => {
    addDoc(commentsRef, { postID, comment, timestamp, name })
        .then(() => {})
        .catch((err) => {
            console.log(err);
        });
};

const getComments = (postID, setComments) => {
    try {
        let commentQuery = query(commentsRef, where("postID", "==", postID));
        onSnapshot(commentQuery, (response) => {
            const comments = response.docs.map((comment) => {
                return {
                    id: comment.id,
                    ...comment.data(),
                };
            });
            console.log(comments);
            setComments(comments);
        });
    } catch (err) {
        console.log(err);
    }
};

export {
    postStatusToFirebase,
    getStatus,
    postUserData,
    getCurrentUser,
    editProfile,
    getSingleStatus,
    getSingleUser,
    likePost,
    getLikesByUser,
    postComment,
    getComments,
};
