import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about posting jobs, contractor estimates, payments, pickup verification, cancellations, reviews, and how the Junk Run marketplace works.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
