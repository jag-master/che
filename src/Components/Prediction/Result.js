import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { data_types } from "./Data";
import "./type.css";
import React from "react";
import "./slow.css";

export default function Result(props) {
  const [introText, setIntroText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [explain, setExplain] = React.useState("");
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  function typeWriter(text) {
    let i = 0;
    const speed = 20;
    let txt = "";

    function type() {
      if (i < text.length) {
        // setIntroText(introText + text.charAt(i));
        txt = txt + text.charAt(i);
        setIntroText(txt);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  function typeWriter2(text) {
    let i = 0;
    const speed = 200;
    let txt = "";

    function type() {
      if (i < text.length) {
        // setIntroText(introText + text.charAt(i));
        txt = txt + text.charAt(i);
        setTitle(txt);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  function typeWriter3(text) {
    let i = 0;
    const speed = 20;
    let txt = "";

    function type() {
      if (i < text.length) {
        // setIntroText(introText + text.charAt(i));
        txt = txt + text.charAt(i);
        setExplain(txt);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // React.useEffect(() => {
  //   typeWriter2(data_types[props.result].title);
  //   typeWriter(data_types[props.result].intro);
  //   typeWriter3(data_types[props.result].explain);
  // }, []);

  return (
    <div
      className="overflow-hidden bg-white py-24 sm:py-32"
      style={{ borderRadius: "40px" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Prediction
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 ">
                {introText}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">{explain}</p>
            </div>
          </div>
          <img
            //  src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            src={props.capturedImage}
            alt="Product screenshot"
            className={`slow-image ${
              imageLoaded ? "fade-in" : ""
            } w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0`}
            style={{ height: "600px", width: "auto", marginLeft: "100px" }}
          />
        </div>
      </div>
    </div>
  );
}
