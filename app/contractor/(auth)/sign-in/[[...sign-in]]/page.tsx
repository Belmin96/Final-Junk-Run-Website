import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Contractor Log In",
};

export default function ContractorSignInPage() {
  return (
    <SignIn
      path="/contractor/sign-in"
      signUpUrl="/contractor/sign-up"
      fallbackRedirectUrl="/contractor"
    />
  );
}
