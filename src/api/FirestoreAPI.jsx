import { firestore } from "../firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";

const dbRef = collection(firestore, "posts");

function postStatusToFirebase(data) {
    addDoc(dbRef, data)
        .then((res) => toast.success("Status posted successfully"))
        .catch((err) => toast.error("Error posting status"));
}

function getStatus(setAllStatuses) {
    onSnapshot(dbRef, (response) => {
        setAllStatuses(
            response.docs.map((post) => {
                return { ...post.data(), id: post.id };
            })
        );
    });
}

export { postStatusToFirebase, getStatus };
