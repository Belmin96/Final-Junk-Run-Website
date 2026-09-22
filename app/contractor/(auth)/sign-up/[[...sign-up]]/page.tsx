import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Become a Contractor",
};

export default function ContractorSignUpPage() {
  return (
    <SignUp
      path="/contractor/sign-up"
      signInUrl="/contractor/sign-in"
      fallbackRedirectUrl="/contractor"
    />
  );
}
