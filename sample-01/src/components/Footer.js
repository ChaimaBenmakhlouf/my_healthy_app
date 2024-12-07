import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        color: "#495057",
        padding: "20px 0",
        textAlign: "center",
        fontSize: "0.9rem",
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
        marginTop: "auto",
      }}
    >
      <div>
        <p style={{ marginBottom: "10px", opacity: 0.7 }}>
          &copy; 2024 Your Company Name. All rights reserved.
        </p>
        <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
          <a href="/privacy-policy" style={{ color: "#007bff", marginRight: "10px" }}>
            Privacy Policy
          </a>
          <a href="/terms-of-service" style={{ color: "#007bff" }}>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
