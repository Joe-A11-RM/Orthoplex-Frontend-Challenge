import React from "react";

export default function NotFound() {
  return (
    <div
      className="notFound"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        flexDirection: "column",
        color: "#3182ce",
      }}
    >
      <h1>404 - Page Not Found</h1>
    </div>
  );
}
