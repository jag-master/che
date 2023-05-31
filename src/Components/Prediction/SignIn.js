import { LockClosedIcon } from "@heroicons/react/20/solid";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

export default function SignInUI(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [typeofauth, setTypeOfAuth] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  async function onSubmitHandlerJSignIn() {
    if (email.length == 0 || password.length == 0) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((u) => {
        console.log("Successful signed In");
        console.log(u);
        setLoading(false);
        toast.success("Signed In");
      })
      .catch((err) => {
        console.log("Unsuccessful sign In");
        console.log(err);
        setLoading(false);
        toast.error("Incorrect Email or Password");
      });
  }

  async function onSubmitHandlerJSignUp() {
    if (email.length == 0 || password.length == 0) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        console.log("Successful sign up");
        console.log(u);
        setLoading(false);
        setTypeOfAuth(0);
        toast.success("Signed Up");
      })
      .catch((err) => {
        console.log("Unsuccessful sign up");
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong");
      });
  }

  return (
    <section style={{ backgroundColor: "inherit" }}>
      <Toaster toastOptions={{ duration: 2000 }} />
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div>
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div class="space-y-4 md:space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email Identification"
                  required=""
                  style={{ width: "500px", height: "70px", fontSize: "30px" }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  style={{ width: "500px", height: "70px", fontSize: "30px" }}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div style={{ display: "flex" }}>
                <button
                  class=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  style={{
                    width: "240px",
                    height: "70px",
                    fontSize: "30px",
                    backgroundColor: typeofauth == 0 ? "white" : "#111827",
                    color: typeofauth == 0 ? "black" : "white",
                    border:
                      typeofauth == 0 ? "0px solid white" : "5px solid white",
                  }}
                  onClick={() => {
                    if (typeofauth == 0) {
                      onSubmitHandlerJSignIn();
                    } else setTypeOfAuth(1 - typeofauth);
                  }}
                >
                  {loading && typeofauth == 0 ? "Wait..." : "Sign in"}
                </button>
                <div style={{ width: "20px" }}></div>
                <button
                  class=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  style={{
                    width: "240px",
                    height: "70px",
                    fontSize: "30px",
                    color: "white",
                    border:
                      typeofauth == 1 ? "0px solid white" : "5px solid white",
                    backgroundColor: typeofauth == 1 ? "white" : "#111827",
                    color: typeofauth == 1 ? "black" : "white",
                  }}
                  onClick={() => {
                    if (typeofauth == 1) {
                      onSubmitHandlerJSignUp();
                    } else setTypeOfAuth(1 - typeofauth);
                  }}
                >
                  {loading && typeofauth == 1 ? "Wait..." : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  {
    /* return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8 -mt-20">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2
              className="mt-6 text-center text-3xl font-bold tracking-tight text-white-900"
              style={{ color: "white" }}
            >
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 flex justify-center">
              {props.signedUp ? (
                <a href="#" className="font-medium" style={{ color: "white" }}>
                  Signed Up successfully
                </a>
              ) : (
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  style={{ color: "white" }}
                >
                  Multi factor authentication
                </a>
              )}
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="    Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="    Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>

              <div className="text-sm">
                <a
                  //  href="/otp"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  No account ? Create It
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={onSubmitHandlerJ}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{ backgroundColor: "white", color: "black" }}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-black-500 group-hover:text-black-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ); */
  }
}
