import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseServices";
import UniqueID from "@/utils/UUID";

const uploadImage = (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, "images/" + UniqueID() + file.name);
  return uploadBytes(storageRef, file).then(() => {
    return getDownloadURL(storageRef);
  });
};

const createPost = (post) => {
  return addDoc(collection(db, "posts"), {
    ...post,
    createdAt: serverTimestamp(),
  });
};

const updatePost = (postId, post) => {
  return updateDoc(doc(db, "posts", postId), {
    ...post,
    createdAt: serverTimestamp(),
  });
};

export default {
  uploadImage,
  createPost,
  updatePost,
};
