import { Button, Input, TextField } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bar_pins, pins } from "../../constant/pins";
import MyContext from "../../contexts/MyContext";
import { app, db } from "../../firebase";
import { PathUrl } from "../../types/router/pathUrl";
import { BasicSelect } from "../basicSelect/BasicSelect";

export const PhotoUpload = () => {
  const { pinStatus } = useContext(MyContext);
  const [file, setFile] = useState<File | null>(null);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [location, setLocation] = useState<string>(pinStatus || "Minju");
  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setFile(files[0]);
  };

  const handleUpload = async () => {
    if (!file || !id || !password || !text) {
      alert("필수항목 모두 넣어주세요");
      return;
    }

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
          time: serverTimestamp(),
          like: 0,
        };

        const docRef = await addDoc(collection(db, "Post"), payload);
        alert("업로드가 완료되었습니다");
        navigate(`${PathUrl.Comment}`);
      }
    );

    // setTimeout(() => {

    // }, 100);
  };

  const result = { ...pins, ...bar_pins };

  return (
    <>
      <h2
        style={{
          color: "#EF3A4A",
          padding: "10px 0",
          marginBottom: "30px",
        }}
      >
        ✨실시간 축제 근황 공유✨
      </h2>
      <TextField
        id="standard-required"
        required
        label="닉네임"
        onChange={(e) => {
          setId(e.target.value);
        }}
        style={{
          marginBottom: "20px",
        }}
      />
      <TextField
        id="standard-required"
        required
        label="비번"
        color="primary"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        style={{
          marginBottom: "20px",
        }}
      />

      <div style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          이미지
          <span
            style={{
              fontSize: "12px",
              color: "#EF3A4A",
            }}
          >
            *
          </span>
        </label>

        <Input type="file" onChange={handleFileChange} />
      </div>
      <TextField
        id="standard-required"
        required
        label="이미지 한 줄 설명"
        color="primary"
        onChange={(e) => {
          setText(e.target.value);
        }}
        style={{
          marginBottom: "20px",
        }}
      />
      <BasicSelect
        defaultValue={location}
        selectOptions={Object.keys(result).map((key) => key)}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Button onClick={handleUpload} variant="contained">
        Upload
      </Button>
    </>
  );
};
