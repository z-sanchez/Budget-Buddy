import { type ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: session } = useSession();

  if (typeof window === "undefined") return null;

  if (!session) void router.push("api/auth/signin");

  return children;
};

export { AuthWrapper };
