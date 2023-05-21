import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pins } from "../../constant/pins";
import MyContext from "../../contexts/MyContext";
import { app, db } from "../../firebase";
import { PathUrl } from "../../types/router/pathUrl";
import { BasicSelect } from "../basicSelect/BasicSelect";

const PhotoUpload = () => {
  const { pinStatus } = useContext(MyContext);
  const [file, setFile] = useState<File | null>(null);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [location, setLocation] = useState<string>("Minju");
  const navigate = useNavigate();

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
          userId: id,
          password: password,
          text: text,
          location: location,
          like: 0,
        };

        const docRef = await addDoc(collection(db, "Post"), payload);
      }
    );

    alert("업로드가 완료되었습니다");
    navigate(`${PathUrl.Map}`);
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
      <BasicSelect
        label="장소"
        selectOptions={Object.keys(pins).map((key) => key)}
        onChange={(e) => {
          console.log(e.target.value);
          setLocation(e.target.value);
        }}
      />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default PhotoUpload;
