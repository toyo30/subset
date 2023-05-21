import { Button, Input, List, ListItem } from "@mui/material";
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
import { pins } from "../../constant/pins";
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
          time: serverTimestamp(),
          like: 0,
        };

        const docRef = await addDoc(collection(db, "Post"), payload);
      }
    );

    alert("업로드가 완료되었습니다");
    navigate(`${PathUrl.Map}`);
  };

  return (
    <div style={{ width: "300px", margin: "auto", marginTop: "50px" }}>
      <List>
        <ListItem
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            marginBottom: "20px",
          }}
        >
          <label style={{ display: "block", marginBottom: "10px" }}>ID</label>
          <Input
            type="text"
            onChange={(e) => {
              setId(e.target.value);
            }}
            style={{ width: "100%", padding: "10px" }}
          />

          <label style={{ display: "block", marginBottom: "10px" }}>PW</label>
          <Input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{ width: "100%", padding: "10px" }}
          />
        </ListItem>

        <ListItem
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            marginBottom: "20px",
          }}
        >
          <Input type="file" onChange={handleFileChange} />
        </ListItem>

        <ListItem
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            marginBottom: "20px",
          }}
        >
          <label
            style={{ display: "block", marginBottom: "10px", width: "30px" }}
          >
            글
          </label>
          <Input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            style={{ width: "100%", padding: "10px" }}
          />
        </ListItem>

        <ListItem
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            marginBottom: "20px",
          }}
        >
          {/* <label style={{ display: 'block', marginBottom: '10px' }}>장소</label> */}
          <BasicSelect
            selectOptions={Object.keys(pins).map((key) => key)}
            onChange={(e) => setLocation(e.target.value)}
          />
        </ListItem>
      </List>

      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};
