import type { Metadata } from "next";
import { Inter, Poppins, Caveat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Junk Run | Get It Gone",
    template: "%s | Junk Run",
  },
  description:
    "Junk Run is a quote-based marketplace connecting customers with independent junk-removal contractors.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// Dark theme + Junk Run's green accent, so Clerk's hosted components
// (<SignIn />, <SignUp />, <UserButton /> menu) match the site instead of
// looking like a stock Clerk widget dropped on top of it.
const clerkAppearance = {
  variables: {
    colorPrimary: "#7ED321",
    colorBackground: "#111512",
    colorInputBackground: "#0a0c0b",
    colorInputText: "#f4f7f5",
    colorText: "#f4f7f5",
    colorTextSecondary: "#8a9591",
    colorDanger: "#ff6b6b",
    borderRadius: "12px",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
  },
  elements: {
    card: { backgroundColor: "#111512", border: "1px solid rgba(180,190,185,0.14)" },
    headerTitle: { fontFamily: "var(--font-poppins), system-ui, sans-serif" },
    formButtonPrimary:
      "bg-[#7ED321] hover:brightness-95 text-[#0a1503] normal-case text-[15px] font-semibold",
    footerActionLink: { color: "#7ED321" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html
        lang="en"
        className={`${inter.variable} ${poppins.variable} ${caveat.variable}`}
      >
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
