import React from "react";
import axios from "axios";
import "./Card.css";
import Webcam from "react-webcam";
import "./Signature.css";
import { useEffect, useRef } from "react";
import $ from "jquery";
import Vivus from "vivus";
import { toast } from "react-hot-toast";
import OTPUI from "./OTP";

export default function Signature() {
  const webcamRef = React.useRef(null);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const animationRef = useRef(null);
  const [show, setShow] = React.useState(false);
  const [imageType, setImageType] = React.useState(0);
  const [imageForBackend, setImageForBackend] = React.useState(null);
  const [predictedClass, setPredictedClass] = React.useState(-1);
  const [showResult, setShowResult] = React.useState(false);

  const [name, setName] = React.useState("");
  const [tob, setTOB] = React.useState("");
  const [phnum, setPhnum] = React.useState("");
  const [accno, setAccNo] = React.useState("");
  const [ifsc, setIFSC] = React.useState("");
  const [branch, setBranch] = React.useState("");

  const [forged, setForged] = React.useState("");

  function typeWriter(text) {
    let i = 0;
    const speed = 120;
    let txt = "";

    function type() {
      if (i < text.length) {
        // setIntroText(introText + text.charAt(i));
        txt = txt + text.charAt(i);
        setName(txt);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  function typeWriter2(text) {
    let i = 0;
    const speed = 120;
    let txt = "";

    function type() {
      if (i < text.length) {
        // setIntroText(introText + text.charAt(i));
        txt = txt + text.charAt(i);
        setTOB(txt);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  function typeWriter3(text) {
    let i = 0;
    const speed = 120;
    let txt = "";

    function type() {
      if (i < text.length) {
        // setIntroText(introText + text.charAt(i));
        txt = txt + text.charAt(i);
        setPhnum(txt);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  function typeWriter4(text) {
    let i = 0;
    const speed = 120;
    let txt = "";

    function type() {
      if (i < text.length) {
        // setIntroText(introText + text.charAt(i));
        txt = txt + text.charAt(i);
        setAccNo(txt);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  function typeWriter5(text) {
    let i = 0;
    const speed = 120;
    let txt = "";

    function type() {
      if (i < text.length) {
        // setIntroText(introText + text.charAt(i));
        txt = txt + text.charAt(i);
        setIFSC(txt);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  function typeWriter6(text) {
    let i = 0;
    const speed = 120;
    let txt = "";

    function type() {
      if (i < text.length) {
        // setIntroText(introText + text.charAt(i));
        txt = txt + text.charAt(i);
        setBranch(txt);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  const team = [
    {
      name: "Chetan Reddy",
      toa: "Salary Bank Account",
      phno: "+91 8105076961",
      an: "3513178006699",
      ifsc: "SABR000687",
      branch: "CANARA BANK - MYSORE JAYANAGARA",
    },
    {
      name: "Sai Nivas Reddy",
      toa: "Savings Bank Account",
      phno: "+91 9948988823",
      an: "851317503699",
      ifsc: "CNRB000173",
      branch: "CANARA BANK - MYSORE MAIN",
    },
    {
      name: "Shreya Kumari",
      toa: "Savings Bank Account",
      phno: "+91 8088118995",
      an: "5515178566644",
      ifsc: "CERT0083892",
      branch: "CANARA BANK - MYSORE VIJAYANAGARA",
    },
    {
      name: "Sameern Rohit",
      toa: "Salary Bank Account",
      phno: "+91 8431973765",
      an: "7513158006595",
      ifsc: "PROD183913",
      branch: "CANARA BANK - MYSORE LAXMIPURAM",
    },
  ];

  useEffect(() => {
    const body = $("body");
    const clone = $(".clone");
    const successIcon = $(".success");
    const fingerprint = $(".fingerprint");

    const finishedDrawing = () => {
      const drawStatus = animationRef.current.getStatus();

      if (drawStatus === "end") {
        successIcon.addClass("active");
      } else {
        successIcon.removeClass("active");
      }
    };

    const options = {
      duration: 50,
      type: "scenario",
      animTimingFunction: Vivus.EASE_OUT,
    };

    animationRef.current = new Vivus("fingerprint", options, finishedDrawing);
    animationRef.current.stop();

    const handleFingerprintHover = () => {
      clone.addClass("hover");
    };

    const handleFingerprintHoverEnd = () => {
      clone.removeClass("hover");
    };

    body.on("mousedown", () => {
      animationRef.current.reset();
      clone.addClass("active");
      animationRef.current.play(1);
    });

    body.on("mouseup", () => {
      clone.removeClass("active");
      animationRef.current.play(-1);
    });

    fingerprint.hover(handleFingerprintHover, handleFingerprintHoverEnd);

    return () => {
      body.off("mousedown");
      body.off("mouseup");
      fingerprint.off("mouseenter mouseleave");
    };
  }, []);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    const blob = await (await fetch(imageSrc)).blob();
    setImageForBackend(blob);

    setCapturedImage(imageSrc);
    setImageType(0);
  };

  const CameraCapture2 = async (event) => {
    const fileInput = event.target.files[0];

    setCapturedImage(URL.createObjectURL(fileInput));
    setImageForBackend(fileInput);

    setImageType(1);
  };

  async function sendToBackend() {
    if (!imageForBackend) {
      return;
    }
    const formData = new FormData();
    formData.append("image", imageForBackend, "image.png");

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      console.log(response.data);
      setPredictedClass(response.data.predicted_class);
      setShowResult(true);

      let pc = response.data.predicted_class / 2;

      setTimeout(() => {
        if (response.data.predicted_class % 2 == 0) {
          typeWriter(team[pc].name);
          typeWriter2(team[pc].toa);
          typeWriter3(team[pc].phno);
          typeWriter4(team[pc].an);
          typeWriter5(team[pc].ifsc);
          typeWriter6(team[pc].branch);
        }
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="bg-white"
      style={{ backgroundColor: "white" }}
      onClick={() => {
        setShow(true);
      }}
    >
      <div className="mx-auto w-full">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl  sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            {showResult ? null : (
              <h1
                className=""
                style={{
                  fontSize: "60px",
                  color: "white",
                  fontWeight: 900,
                  lineHeight: "60px",
                }}
              >
                Signature Verification
              </h1>
            )}
            {showResult ? (
              <div
                elevation={2}
                style={{
                  width: "500px",
                  height: "550px",
                  backgroundColor: "white",
                  borderRadius: "25px",
                  marginTop: "0px",
                }}
              >
                <div style={{ padding: "20px" }}>
                  {predictedClass &&
                  predictedClass >= 0 &&
                  predictedClass % 2 ? (
                    <h1 style={{ fontSize: "50px", fontWeight: 500 }}>
                      This is a forged signature
                    </h1>
                  ) : (
                    <div>
                      {/* {
        name: "Chetan Reddy",
        toa: "Salary Bank Account",
        phno: "8105076961",
        an: "3513178006699",
        ifsc: "SABR000687",
        branch: "CANARA BANK - MYSORE JAYANAGARA",
      } */}
                      <h1
                        style={{
                          fontSize: "25px",
                          fontWeight: 500,
                          display: "flex",
                        }}
                      >
                        Name : {name}
                        <div>
                          <img
                            src={capturedImage}
                            alt="Captured"
                            style={{
                              width: "150px",

                              borderRadius: "10%",
                              marginLeft: "20px",
                            }}
                          />
                        </div>
                      </h1>
                      <h1
                        style={{
                          fontSize: "25px",
                          fontWeight: 500,
                        }}
                      >
                        {tob}
                      </h1>
                      <h1
                        style={{
                          fontSize: "25px",
                          fontWeight: 500,
                        }}
                      >
                        {phnum}
                      </h1>
                      <h1
                        style={{
                          fontSize: "25px",
                          fontWeight: 500,
                        }}
                      >
                        AcNo :{accno}
                      </h1>
                      <h1
                        style={{
                          fontSize: "25px",
                          fontWeight: 500,
                        }}
                      >
                        IFSC : {ifsc}
                      </h1>
                      <h1
                        style={{
                          fontSize: "23px",
                          fontWeight: 500,
                        }}
                      >
                        {branch}
                      </h1>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {<OTPUI phnum={team[predictedClass / 2].phno} />}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            {showResult ? null : (
              <div
                className="mt-6 text-lg leading-8 text-gray-300"
                style={{ display: "flex" }}
              >
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  style={{
                    width: capturedImage ? "250px" : "300px",
                    marginTop: "20px",
                    borderRadius: "10%",
                  }}
                />

                {capturedImage && (
                  <div>
                    <img
                      src={capturedImage}
                      alt="Captured"
                      style={{
                        width: "150px",
                        marginTop: "45px",
                        borderRadius: "10%",
                        marginLeft: "20px",
                      }}
                    />
                  </div>
                )}
              </div>
            )}
            {showResult ? null : (
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <label
                  htmlFor="file-upload"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    captureImage();
                  }}
                >
                  Capture Sign
                </label>
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={CameraCapture2}
                  style={{ borderRadius: "7px" }}
                />
              </div>
            )}
            <br /> <br /> <br /> <br /> <br />
            <br /> <br /> <br /> <br /> <br />
          </div>
          <div style={{ marginLeft: "200px", marginTop: "-200px" }}>
            <div
              class="wrap"
              onClick={() => {
                sendToBackend();
              }}
            >
              <svg
                class="fingerprint clone"
                // xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enable-background="new 0 0 100 100"
                // xml:space="preserve"
                style={{ position: "absolute" }}
              >
                <g>
                  <path
                    id="inner"
                    fill={
                      predictedClass == -1
                        ? "#eae9e9"
                        : predictedClass % 2
                        ? "#c0392b"
                        : "#008140"
                    }
                    d="M51.5,5c-0.9-0.2-1.9,0.4-2.1,1.3c-0.2,0.9,0.4,1.9,1.3,2.1C66.3,12.1,77.2,26,77.2,42.1v15.8c0,11.1-9,20.1-20,20.1   c-11,0-20-9-20-20.1V42.1c0-3.1,2.5-5.6,5.5-5.6c3,0,5.5,2.5,5.5,5.6v15.8V58c0,0,0,0.1,0,0.1c0.1,4.9,4.1,8.9,9,8.9   c4.9,0,8.9-4,9-8.9c0,0,0-0.1,0-0.1V42.1c0-13-10.5-23.6-23.5-23.6c-12.9,0-23.4,10.5-23.5,23.4c0,0,0,0,0,0v15.9   c0,17.7,12,32.9,29.2,37c0.1,0,0.3,0,0.4,0c0.8,0,1.5-0.5,1.7-1.3c0.2-0.9-0.4-1.9-1.3-2.1C33.7,87.9,22.8,74,22.8,57.9V42.1   c0-11.1,9-20.1,20-20.1c11,0,20,9,20,20.1v15.8c0,3.1-2.5,5.6-5.5,5.6c-3,0-5.5-2.5-5.5-5.6V42.1V42c0,0,0-0.1,0-0.1   c-0.1-4.9-4.1-8.9-9-8.9c-4.9,0-8.9,4-9,8.9c0,0,0,0.1,0,0.1v15.9c0,13,10.5,23.6,23.5,23.6c12.9,0,23.4-10.5,23.5-23.4   c0,0,0,0,0,0V42.1C80.7,24.4,68.7,9.1,51.5,5z"
                  ></path>
                  <path
                    id="outer"
                    fill={
                      predictedClass == -1
                        ? "#eae9e9"
                        : predictedClass % 2
                        ? "#c0392b"
                        : "#008140"
                    }
                    d="M28.8,18.6c4.2-2.5,9-3.9,13.9-3.9C57.8,14.7,70,27,70,42.1v15.8c0,7.1-5.7,12.8-12.7,12.8c-7,0-12.7-5.8-12.7-12.8V42   c0-1-0.8-1.7-1.7-1.7c-1,0-1.7,0.8-1.7,1.7v15.9c0,9,7.3,16.3,16.2,16.3c8.9,0,16.1-7.2,16.2-16.1c0,0,0-0.1,0-0.1V42.1   c0-17-13.8-30.8-30.7-30.8c-5.5,0-11,1.5-15.7,4.3c-0.8,0.5-1.1,1.6-0.6,2.4S28,19.1,28.8,18.6z"
                  ></path>
                  <path
                    id="outermost"
                    fill={
                      predictedClass == -1
                        ? "#eae9e9"
                        : predictedClass % 2
                        ? "#c0392b"
                        : "#008140"
                    }
                    d="M71.2,81.4c-4.2,2.5-9,3.9-13.9,3.9C42.2,85.3,30,73,30,57.9V42.1c0-7.1,5.7-12.8,12.7-12.8c7,0,12.7,5.8,12.7,12.8V58   c0,1,0.8,1.7,1.7,1.7c1,0,1.7-0.8,1.7-1.7V42.1c0-9-7.3-16.3-16.2-16.3c-8.9,0-16.1,7.2-16.2,16.1c0,0,0,0.1,0,0.1v15.9   c0,17,13.8,30.8,30.7,30.8c5.5,0,11-1.5,15.7-4.3c0.8-0.5,1.1-1.6,0.6-2.4C73.1,81.2,72,80.9,71.2,81.4z"
                  ></path>
                </g>
              </svg>
              <svg
                id="fingerprint"
                class="fingerprint"
                // xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enable-background="new 0 0 100 100"
                // xml:space="preserve"
              >
                <g>
                  <path
                    id="inner"
                    stroke={show ? "#F3BF2F" : "#3F2752"}
                    stroke-linecap="round"
                    stroke-width="2"
                    fill="none"
                    d="M51.5,5c-0.9-0.2-1.9,0.4-2.1,1.3c-0.2,0.9,0.4,1.9,1.3,2.1C66.3,12.1,77.2,26,77.2,42.1v15.8c0,11.1-9,20.1-20,20.1   c-11,0-20-9-20-20.1V42.1c0-3.1,2.5-5.6,5.5-5.6c3,0,5.5,2.5,5.5,5.6v15.8V58c0,0,0,0.1,0,0.1c0.1,4.9,4.1,8.9,9,8.9   c4.9,0,8.9-4,9-8.9c0,0,0-0.1,0-0.1V42.1c0-13-10.5-23.6-23.5-23.6c-12.9,0-23.4,10.5-23.5,23.4c0,0,0,0,0,0v15.9   c0,17.7,12,32.9,29.2,37c0.1,0,0.3,0,0.4,0c0.8,0,1.5-0.5,1.7-1.3c0.2-0.9-0.4-1.9-1.3-2.1C33.7,87.9,22.8,74,22.8,57.9V42.1   c0-11.1,9-20.1,20-20.1c11,0,20,9,20,20.1v15.8c0,3.1-2.5,5.6-5.5,5.6c-3,0-5.5-2.5-5.5-5.6V42.1V42c0,0,0-0.1,0-0.1   c-0.1-4.9-4.1-8.9-9-8.9c-4.9,0-8.9,4-9,8.9c0,0,0,0.1,0,0.1v15.9c0,13,10.5,23.6,23.5,23.6c12.9,0,23.4-10.5,23.5-23.4   c0,0,0,0,0,0V42.1C80.7,24.4,68.7,9.1,51.5,5z"
                  ></path>
                  <path
                    id="outer"
                    fill="none"
                    stroke={show ? "#F3BF2F" : "#3F2752"}
                    stroke-width="2"
                    d="M28.8,18.6c4.2-2.5,9-3.9,13.9-3.9C57.8,14.7,70,27,70,42.1v15.8c0,7.1-5.7,12.8-12.7,12.8c-7,0-12.7-5.8-12.7-12.8V42   c0-1-0.8-1.7-1.7-1.7c-1,0-1.7,0.8-1.7,1.7v15.9c0,9,7.3,16.3,16.2,16.3c8.9,0,16.1-7.2,16.2-16.1c0,0,0-0.1,0-0.1V42.1   c0-17-13.8-30.8-30.7-30.8c-5.5,0-11,1.5-15.7,4.3c-0.8,0.5-1.1,1.6-0.6,2.4S28,19.1,28.8,18.6z"
                  ></path>
                  <path
                    id="outermost"
                    // stroke="#c0392b"
                    stroke={show ? "#F3BF2F" : "#3F2752"}
                    stroke-width="2"
                    fill="none"
                    d="M71.2,81.4c-4.2,2.5-9,3.9-13.9,3.9C42.2,85.3,30,73,30,57.9V42.1c0-7.1,5.7-12.8,12.7-12.8c7,0,12.7,5.8,12.7,12.8V58   c0,1,0.8,1.7,1.7,1.7c1,0,1.7-0.8,1.7-1.7V42.1c0-9-7.3-16.3-16.2-16.3c-8.9,0-16.1,7.2-16.2,16.1c0,0,0,0.1,0,0.1v15.9   c0,17,13.8,30.8,30.7,30.8c5.5,0,11-1.5,15.7-4.3c0.8-0.5,1.1-1.6,0.6-2.4C73.1,81.2,72,80.9,71.2,81.4z"
                  ></path>
                </g>
              </svg>
              <i class="success fa fa-check-circle fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
