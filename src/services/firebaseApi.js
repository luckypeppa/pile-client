import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UniqueID from "@/utils/UUID";

const uploadImage = (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, "images/" + UniqueID() + file.name);
  return uploadBytes(storageRef, file).then(() => {
    return getDownloadURL(storageRef);
  });
};

export default {
  uploadImage,
};
