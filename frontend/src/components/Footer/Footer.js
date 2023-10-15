import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="footer-contact">
          <p>Contact: 7772839465</p>
          <p>Location: Indore, Madhya Pradesh</p>
        </div>
        <div className="footer-credits">
          <p>Created by Yash Chandrawat, Vedika Patidar, Vishal Makwana</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
