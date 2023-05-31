import React from "react";
import axios from "axios";
import ResultUI from "./Result";
import "./Card.css";
import SignInUI from "./SignIn";

export default function Alzehimer() {
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [result, setResult] = React.useState(-1);
  const [loading, setLoading] = React.useState(false);
  const [signinLoad, setSignInLoad] = React.useState(false);

  const CameraCapture2 = async (event) => {
    setLoading(true);
    setResult(-1);
    setCapturedImage(null);

    setTimeout(() => {
      setLoading(false);
      window.scrollTo({
        top: window.pageYOffset + 800,
        behavior: "smooth",
      });
    }, 1000);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white" style={{ backgroundColor: "white" }}>
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
            <h1
              className=""
              style={{
                fontSize: "60px",
                color: "white",
                fontWeight: 900,
                lineHeight: "60px",
              }}
            >
              Multi factor Authentication System
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Introducing our secure and efficient multi-factor authentication
              system application. Safeguard your digital accounts with an extra
              layer of protection,with biometrics and one-time passwords
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <label
                htmlFor="file-upload"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSignInLoad(true);

                  setTimeout(() => {
                    window.scrollTo({
                      top: window.pageYOffset + 1800,
                      behavior: "smooth",
                    });
                  }, 300);
                }}
              >
                Get Started
              </label>

              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
            <br /> <br /> <br /> <br /> <br />
            <br /> <br /> <br /> <br /> <br />
          </div>
          <div className="relative" style={{ marginLeft: "130px" }}>
            <div style={{ height: "300px" }}></div>
            <main id="app">
              <aside class="card-front" style={{ marginTop: "-10px" }}>
                <label class="number" for="cardNumber">
                  5355 1234 xxxx xxxx
                </label>
                <label class="name" for="cardHolder">
                  Chetan Reddy
                </label>
                <label class="expiry" for="expiryMonth">
                  03/27
                </label>
                <img
                  class="cardLogo"
                  data-v-5d206127=""
                  data-v-8fcb32d4=""
                  style={{ opacity: 1 }}
                  src="https://simey-credit-card.netlify.app/img/logos/master.svg"
                />

                <div class="chip">
                  <svg role="img" viewBox="0 0 100 100" aria-label="Chip">
                    <use href="#chip-lines" />
                  </svg>
                </div>
                <svg
                  class="contactless"
                  role="img"
                  viewBox="0 0 24 24"
                  aria-label="Contactless"
                >
                  <use href="#contactless"></use>
                </svg>
              </aside>
            </main>

            <svg id="chip">
              <g id="chip-lines">
                <polyline points="0,50 35,50"></polyline>
                <polyline points="0,20 20,20 35,35"></polyline>
                <polyline points="50,0 50,35"></polyline>
                <polyline points="65,35 80,20 100,20"></polyline>
                <polyline points="100,50 65,50"></polyline>
                <polyline points="35,35 65,35 65,65 35,65 35,35"></polyline>
                <polyline points="0,80 20,80 35,65"></polyline>
                <polyline points="50,100 50,65"></polyline>
                <polyline points="65,65 80,80 100,80"></polyline>
              </g>
            </svg>

            <svg id="contactless">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9.172 15.172a4 4 0 0 1 5.656 0"></path>
              <path d="M6.343 12.343a8 8 0 0 1 11.314 0"></path>
              <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"></path>
            </svg>
          </div>
        </div>
        {signinLoad && (
          <div className="relative isolate overflow-hidden bg-gray-900 shadow-2xl">
            <SignInUI />
          </div>
        )}

        {capturedImage && result != -1 ? (
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl  sm:px-16 md:pt-0 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <ResultUI capturedImage={capturedImage} result={result} />
          </div>
        ) : null}
        {capturedImage && result != -1 ? (
          <div
            style={{
              backgroundColor: "#111827",
              width: "100%",
              height: "50px",
            }}
          ></div>
        ) : null}
      </div>
    </div>
  );
}
