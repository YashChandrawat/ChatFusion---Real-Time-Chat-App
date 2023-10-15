import React from "react";
import "./Footer.css";
import { Button } from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Button
            color={"white"}
            colorScheme="instagram"
            leftIcon={<FaInstagram />}
          >
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </Button>

          <Button color={"white"} colorScheme="github" leftIcon={<FaGithub />}>
            <a
              href="https://www.github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
          <Button
            color={"white"}
            colorScheme="linkedIn"
            leftIcon={<FaLinkedin />}
          >
            <a
              href="https://www.linkedIn.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </Button>
          
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
