import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  where,
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

const getPosts = (tag) => {
  let q;
  if (tag) {
    q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      where("tag", "==", tag)
    );
  } else {
    q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  }
  return getDocs(q).then((querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      const post = { id: doc.id, ...doc.data() };
      posts.push(post);
    });
    return posts;
  });
};

const deletePost = (postId) => {
  return deleteDoc(doc(db, "posts", postId));
};

export default {
  uploadImage,
  createPost,
  updatePost,
  getPosts,
  deletePost,
};
