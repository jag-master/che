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
        props.nextComp();
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
}
