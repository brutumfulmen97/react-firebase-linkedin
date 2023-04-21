import { firestore } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const dbRef = collection(firestore, "posts");

function postStatusToFirebase(data) {
    addDoc(dbRef, data)
        .then((res) => toast.success("Status posted successfully"))
        .catch((err) => toast.error("Error posting status"));
}

export { postStatusToFirebase };
