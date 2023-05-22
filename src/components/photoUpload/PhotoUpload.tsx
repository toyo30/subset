import { Button, Input, TextField } from "@mui/material";
import ImageResizer from "browser-image-resizer";
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

const config = {
  quality: 0.5,
  maxWidth: 800,
  maxHeight: 800,
  autoRotate: true,
  debug: true,
};

export const PhotoUpload = () => {
  const { pinStatus } = useContext(MyContext);
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<Blob | null>(null);
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

  const handleFileChangeData = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const resizedImage = await ImageResizer.readAndCompressImage(
        file,
        config
      );
      setFileData(resizedImage);
      // 이제 `resizedImage`를 서버에 업로드합니다.
      // 여기서는 firebase storage를 예로 들겠습니다.
      // const storageRef = firebase.storage().ref();
      // const fileRef = storageRef.child('some-directory/' + resizedImage.name);
      // await fileRef.put(resizedImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    if (!file || !id || !password || !text || !fileData) {
      alert("필수항목 모두 넣어주세요");
      return;
    }

    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${file.name}`);

    if (!fileData) {
      alert("사진을 다시 업로드해주세요");
      return;
    }

    const uploadTask = uploadBytesResumable(storageRef, fileData);

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

        <Input
          type="file"
          onChange={(e: any) => {
            handleFileChange(e);
            handleFileChangeData(e);
          }}
        />
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
