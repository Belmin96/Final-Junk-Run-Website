import Link from "next/link";
import GlobalSmoke from "@/components/GlobalSmoke";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalSmoke />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          gap: "32px",
        }}
      >
        <Link href="/" className="logo" style={{ textAlign: "center" }}>
          <div
            className="logo-row"
            style={{ justifyContent: "center", display: "flex" }}
          >
            <svg
              width="30"
              height="18"
              viewBox="0 0 34 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 17L9 5L13.5 11L20 2L28 17"
                stroke="#7ED321"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="logo-word">
              JUNK<span className="run">RUN</span>
            </span>
          </div>
          <span className="logo-tag">JUNK REMOVAL MADE SIMPLE</span>
        </Link>
        {children}
      </div>
    </>
  );
}
