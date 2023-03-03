import { type ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SIGNIN_PATH } from "../utils/constants";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const { data: session } = useSession();

  if (typeof window === "undefined") return <></>;

  if (!session) void router.push(SIGNIN_PATH);

  if (session) {
    return <>{children}</>;
  }

  return <></>;
};

export { AuthWrapper };
