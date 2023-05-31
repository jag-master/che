import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./result.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult] = React.useState(-1);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const captureImage = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const imageSrc = webcamRef.current.getScreenshot();

    const blob = await (await fetch(imageSrc)).blob();

    const formData = new FormData();
    formData.append("image", blob, "image.png");

    setCapturedImage(imageSrc);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      console.log("Response");
      console.log(response.data);

      // setResult(response.data.predicted_class);

      if (response.data.predicted_class) {
        setTimeout(() => {
          navigate("/otp");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const CameraCapture2 = async (event) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    const fileInput = event.target.files[0];

    setCapturedImage(URL.createObjectURL(fileInput));
    const formData = new FormData();
    formData.append("image", fileInput, "image.png");

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      console.log(response.data);
      setResult(response.data.predicted_class);

      setTimeout(() => {
        if (response.data.predicted_class) navigate("/otp");
      }, 5700);
    } catch (error) {
      console.error(error);
    }
  };

  async function getTested() {
    await axios
      .get("http://localhost:5000/")
      .then((u) => {
        console.log(u);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div style={{ marginBottom: "100px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-100px",
        }}
      >
        <div style={{ width: "1%" }}></div>
        <div style={{ width: "24%" }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            style={{ width: "100%", marginTop: "70px", borderRadius: "10%" }}
          />
        </div>
        <div style={{ width: "7%" }}></div>
        <img
          alt=""
          src={
            loading
              ? "https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"
              : result == -1
              ? "https://daily.jstor.org/wp-content/uploads/2014/11/NapoleonSignature2_1050x700.jpg"
              : result == 1
              ? "https://media.tenor.com/9S4NYc8hfiYAAAAC/gorilla-monkey.gif"
              : "https://media.tenor.com/GLjnCjWNdXkAAAAC/bye-girl.gif"
          }
          style={{ width: "26%", borderRadius: "50%", marginTop: "50px" }}
        />
        <div style={{ width: "7%" }}></div>
        <div style={{ width: "24%" }}>
          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              style={{ width: "100%", marginTop: "70px", borderRadius: "10%" }}
            />
          )}
        </div>
        <div style={{ width: "1%" }}></div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        {/* <button
          type="button"
          class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          style={{
            width: "200px",
            height: "50px",
            fontSize: "16px",
            backgroundColor: loading
              ? "white"
              : result == -1
              ? "white"
              : result == 1
              ? "white"
              : "red",
            color: loading ? "black" : result == 0 ? "white" : "black",
          }}
          onClick={() => {
            captureImage();
            //  getTested();
          }}
        >
          {loading
            ? "Verifying..."
            : result == -1
            ? "Capture Signature"
            : result == 1
            ? "Signature Verified"
            : "Forged Signature"}
        </button> */}

        <input
          id="image-input"
          type="file"
          accept="image/*"
          class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          style={{ width: "200px", height: "50px", fontSize: "16px" }}
          onChange={CameraCapture2}
        />
      </div>
    </div>
  );
};

export default CameraCapture;
