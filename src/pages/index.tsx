import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../server/auth";
import { getCsrfToken } from "next-auth/react";
import {
  BLUE,
  DASHBOARD_PATH,
  EXTRA_LIGHT_GREY,
  GREEN_STATE,
  GREY,
} from "../utils/constants";
import LoginSplash from "../../public/login-splash.svg";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex h-screen w-screen min-w-[975px]">
      <div className="flex h-full w-1/2 items-center justify-center">
        <LoginSplash />
      </div>
      <div className="flex h-full w-1/2 items-center justify-center">
        <div className="w-3/4 py-8 px-3">
          <form method="post" action="/api/auth/signin/email">
            <div className="flex items-center">
              <p
                className="cursor-pointer border-x-0 border-y-0 border-b-2 pl-1 pr-10 pb-1 text-xl font-light  2xl:text-2xl"
                style={{ borderColor: GREEN_STATE }}
              >
                Sign In
              </p>
            </div>

            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <input
              className="mt-10 w-full rounded-lg py-3 pl-3 "
              style={{
                backgroundColor: EXTRA_LIGHT_GREY,
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
            ></input>

            <button
              type="submit"
              style={{
                backgroundColor: GREEN_STATE,
              }}
              className="mt-5 w-full rounded-lg py-3 pl-3 font-medium text-white "
            >
              Sign In
            </button>
          </form>
          <p
            className="mt-5 w-full text-center font-medium"
            style={{ color: GREY }}
          >
            or
          </p>

          <button
            onClick={() => void signIn("google")}
            style={{
              backgroundColor: BLUE,
            }}
            className="mt-5 w-full rounded-lg py-3 pl-3 font-medium text-white "
          >
            Sign In With Google
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const csrfToken = await getCsrfToken(context);
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: DASHBOARD_PATH } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [], csrfToken },
  };
}
