import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RootService from "../../services/root.service";

function App() {
  const [imageData, setImageData] = useState(null);
  const { imageId } = useParams();
  useEffect(() => {
    // Gọi API để lấy dữ liệu của ảnh dựa trên ID
    // fetch(`http://localhost:8089/api/v1/images/${imageId}`)
    //   .then((response) => response.blob())
    //   .then((data) => setImageData(data))
    //   .catch((error) => console.error("Error fetching image data:", error));
    const fetchImageData = async () => {
      try {
        const response = await RootService.ImageService.downloadFile(imageId);
        setImageData(response.data.blob());
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchImageData();
  }, [imageId]);

  return (
    <div>
      {/* Hiển thị ảnh */}
      {imageData && <img src={URL.createObjectURL(imageData)} alt="ảnh" />}
    </div>
  );
}

export default App;
