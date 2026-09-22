export default function GlobalSmoke() {
  return (
    <div className="global-smoke" aria-hidden="true">
      <span
        style={{
          width: "360px",
          height: "360px",
          left: "-140px",
          top: "6%",
          opacity: 0.28,
        }}
      />
      <span
        style={{
          width: "300px",
          height: "300px",
          right: "-120px",
          top: "22%",
          opacity: 0.22,
          animationDelay: "-10s",
        }}
      />
      <span
        style={{
          width: "340px",
          height: "340px",
          left: "-110px",
          top: "48%",
          opacity: 0.25,
          animationDelay: "-22s",
        }}
      />
      <span
        style={{
          width: "280px",
          height: "280px",
          right: "-100px",
          top: "68%",
          opacity: 0.2,
          animationDelay: "-14s",
        }}
      />
      <span
        style={{
          width: "320px",
          height: "320px",
          left: "-120px",
          top: "88%",
          opacity: 0.24,
          animationDelay: "-30s",
        }}
      />
    </div>
  );
}
