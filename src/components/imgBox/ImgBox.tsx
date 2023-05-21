import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../../firebase";

interface Props {
  path: string;
  style?: React.CSSProperties;
}

export const ImageComponent: React.FC<Props> = ({ path, style }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const storage = getStorage(app);

  const getUrl = () => {
    if (!path) return null;
    const imageRef = ref(storage, path);
    // 참조된 위치에서 다운로드 URL을 가져옵니다.
    getDownloadURL(imageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error(`Failed to get download URL for image: ${error}`);
      });
  };

  useEffect(() => {
    // 이미지를 저장한 위치의 참조를 가져옵니다.

    getUrl();
  }, []);

  return imageUrl ? (
    <img src={imageUrl} alt="From Firebase Storage" style={style} />
  ) : (
    <img src={`${process.env.PUBLIC_URL}/Zola.png`}></img>
  );
};
