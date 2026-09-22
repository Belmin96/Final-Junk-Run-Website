import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return <SignUp path="/sign-up" signInUrl="/sign-in" fallbackRedirectUrl="/dashboard" />;
}
