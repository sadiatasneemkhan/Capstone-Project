import React from "react";
import { Link } from "react-router-dom";
import logoWhite from "../images/logo-white.png"; // Ensure the path is correct

const NavigationBar = () => {
  const navStyles = {
    backgroundColor: "#1a1a1a", 
    color: "white",
    padding: "12px 20px",
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const logoStyles = {
    height: "32px", 
  };

  const linksContainerStyles = {
    display: "flex",
    gap: "20px",
  };

  const linkStyles = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "opacity 0.3s",
  };

  const hoverEffect = {
    opacity: "0.8",
  };

  return (
    <nav style={navStyles}>
      <div style={containerStyles}>
        {/* Logo */}
        <Link to="/">
          <img src={logoWhite} alt="Urban Systems" style={logoStyles} />
        </Link>

        {/* Navigation Links */}
        <div style={linksContainerStyles}>
          <Link to="/chatbot" style={linkStyles} onMouseOver={(e) => (e.target.style.opacity = hoverEffect.opacity)} onMouseOut={(e) => (e.target.style.opacity = "1")}>
            CHATBOT
          </Link>
          <Link to="/blogs" style={linkStyles} onMouseOver={(e) => (e.target.style.opacity = hoverEffect.opacity)} onMouseOut={(e) => (e.target.style.opacity = "1")}>
            BLOGS
          </Link>
          <Link to="/add-post" style={linkStyles} onMouseOver={(e) => (e.target.style.opacity = hoverEffect.opacity)} onMouseOut={(e) => (e.target.style.opacity = "1")}>
            ADD POST
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
