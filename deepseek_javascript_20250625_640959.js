import { db } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";

async function createPost(username, caption) {
    try {
        await addDoc(collection(db, "posts"), {
            username,
            caption,
            likes: 0,
            timestamp: new Date()
        });
        console.log("Post uploaded!");
    } catch (e) {
        console.error("Error adding post: ", e);
    }
}

createPost("user3", "Just hiked a mountain! ⛰️");