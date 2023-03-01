import { type NextPage } from "next";
import LoginSplash from "../../public/login-splash.svg";
import { GREEN_STATE, LIGHT_GREY, EXTRA_LIGHT_GREY } from "../utils/constants";
import { useState } from "react";

const SignIn: NextPage = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div className="flex h-screen w-screen min-w-[975px]">
      <div className="flex h-full w-1/2 items-center justify-center">
        <LoginSplash />
      </div>
      <div className="flex h-full w-1/2 items-center justify-center">
        <div className="w-3/4 py-8 px-3">
          <form>
            <div className="flex items-center">
              <p
                className="cursor-pointer border-x-0 border-y-0 border-b-2 pl-1 pr-10 pb-1 text-xl font-light transition 2xl:text-2xl"
                style={{ borderColor: signIn ? GREEN_STATE : LIGHT_GREY }}
                onClick={() => setSignIn(true)}
              >
                Sign In
              </p>
              <p
                className=" cursor-pointer border-x-0 border-y-0 border-b-2 pl-1 pr-10 pb-1  text-xl font-light transition 2xl:text-2xl"
                style={{ borderColor: signIn ? LIGHT_GREY : GREEN_STATE }}
                onClick={() => setSignIn(false)}
              >
                Sign Up
              </p>
            </div>

            <input
              type="text"
              className="mt-10 w-full rounded-lg py-3 pl-3 "
              style={{
                backgroundColor: EXTRA_LIGHT_GREY,
              }}
              placeholder="Username"
            ></input>

            {!signIn && (
              <input
                type="email"
                className="mt-10 w-full rounded-lg py-3 pl-3"
                style={{
                  backgroundColor: EXTRA_LIGHT_GREY,
                }}
                placeholder="Email"
              ></input>
            )}

            <input
              type="password"
              className="mt-10 w-full rounded-lg py-3 pl-3 "
              style={{
                backgroundColor: EXTRA_LIGHT_GREY,
              }}
              placeholder="Password"
            ></input>

            {!signIn && (
              <input
                type="password"
                className="mt-10 w-full rounded-lg py-3 pl-3"
                style={{
                  backgroundColor: EXTRA_LIGHT_GREY,
                }}
                placeholder="Re-enter Password"
              ></input>
            )}

            <button
              style={{
                backgroundColor: GREEN_STATE,
              }}
              className="mt-10 w-full rounded-lg py-3 pl-3 font-medium text-white "
            >
              {signIn ? "Sign In" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
