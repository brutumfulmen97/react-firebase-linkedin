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
const connectionsRef = collection(firestore, "connections");

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

function getUsers(setAllUsers) {
    onSnapshot(usersRef, (response) => {
        setAllUsers(
            response.docs.map((user) => {
                return { ...user.data() };
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
                    return { ...user.data() };
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
                return { ...user.data() };
            })[0]
        );
    });
}

function getSingleStatus(setAllStatuses, id) {
    const singlePostQuery = query(postsRef, where("userID", "==", id));
    onSnapshot(singlePostQuery, (response) => {
        setAllStatuses(
            response.docs.map((post) => {
                return { ...post.data() };
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

function addConnection(userID, targetID) {
    try {
        let docToConnect = doc(connectionsRef, `${userID}_${targetID}`);
        setDoc(docToConnect, { userID, targetID });
        toast.success("Connection added successfully");
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

const getConnectionsByUser = (userID, targetID, setIsConnected) => {
    try {
        let connectionsQuery = query(
            connectionsRef,
            where("targetID", "==", targetID)
        );
        onSnapshot(connectionsQuery, (response) => {
            let connections = response.docs.map((item) => item.data());
            let connectionsCount = connections.length;
            const isConnected = connections.some(
                (item) => item.userID === userID
            );
            setIsConnected(isConnected);
        });
    } catch (err) {
        console.log(err);
    }
};

const postComment = (postID, comment, timestamp, name, email, userID) => {
    addDoc(commentsRef, { postID, comment, timestamp, name, email, userID })
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
            setComments(comments);
        });
    } catch (err) {
        console.log(err);
    }
};

const editPost = (postID, data) => {
    let postToEdit = doc(postsRef, postID);
    updateDoc(postToEdit, data)
        .then(() => {
            toast.success("Post edited successfully");
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error editing post");
        });
};

const deletePost = (postID) => {
    let postToDelete = doc(postsRef, postID);
    deleteDoc(postToDelete)
        .then(() => {
            toast.success("Post deleted successfully");
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error deleting post");
        });
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
    getUsers,
    editPost,
    deletePost,
    addConnection,
    getConnectionsByUser,
};
