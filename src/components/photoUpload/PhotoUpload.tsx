import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ChangeEvent, useContext, useState } from "react";
import MyContext from "../../contexts/MyContext";
import { app, db } from "../../firebase";

const PhotoUpload = () => {
  const { pinStatus } = useContext(MyContext);
  const [file, setFile] = useState<File | null>(null);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [text, setText] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setFile(files[0]);
  };

  const handleUpload = async () => {
    if (!file || !id || !password || !text) return;

    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress, errors, etc...
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        await setDoc(doc(db, "images", file.name), {
          url: downloadURL,
          name: file.name,
        });

        const payload = {
          url: downloadURL,
          name: file.name,
          id: id,
          password: password,
          text: text,
          like: 0,
        };

        const docRef = await addDoc(collection(db, pinStatus), payload);
      }
    );

    alert("업로드가 완료되었습니다");
  };

  return (
    <div>
      <div>
        <label>아이디</label>
        <input
          type="text"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <label>비번</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <label>text</label>
        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default PhotoUpload;
