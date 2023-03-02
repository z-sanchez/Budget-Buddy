import { type NextPage } from "next";
import LoginSplash from "../../public/login-splash.svg";
import { GREEN_STATE, EXTRA_LIGHT_GREY, BLUE, GREY } from "../utils/constants";

const SignIn: NextPage = () => {
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
                className="cursor-pointer border-x-0 border-y-0 border-b-2 pl-1 pr-10 pb-1 text-xl font-light  2xl:text-2xl"
                style={{ borderColor: GREEN_STATE }}
              >
                Sign In
              </p>
            </div>

            <input
              type="text"
              className="mt-10 w-full rounded-lg py-3 pl-3 "
              style={{
                backgroundColor: EXTRA_LIGHT_GREY,
              }}
              placeholder="Email"
            ></input>

            <button
              style={{
                backgroundColor: GREEN_STATE,
              }}
              className="mt-5 w-full rounded-lg py-3 pl-3 font-medium text-white "
            >
              Sign In
            </button>

            <p
              className="mt-5 w-full text-center font-medium"
              style={{ color: GREY }}
            >
              or
            </p>

            <button
              style={{
                backgroundColor: BLUE,
              }}
              className="mt-5 w-full rounded-lg py-3 pl-3 font-medium text-white "
            >
              Sign In With Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
