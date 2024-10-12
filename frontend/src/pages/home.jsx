import React from "react";
import { Container } from "react-bootstrap";
import AppNavbar from "./navbar";
import "./home.css";
import homeImage from "./homeIMG.jpeg"
import homeLogo from "./imageLogo.png"

const Home = () => {
  return (
    <>
      <AppNavbar />
      <Container className="mt-4 text-center">
        <div className="main">
          <div className="insideNav">
            <img className="imgLogo" src={homeLogo} alt="" />
            <h2>Certificate Verification System</h2>
          </div><br />
          <div className="mainBody">
            <div className="content">
              <h1>Certificate Varification<br/>System</h1>
            <img className="img1" src={homeImage} alt="photo" />
              <p>A Certificate Management System automates certificate creation, issuance, and verification with customizable templates and secure authentication. It supports bulk data uploads, easy tracking, and integrates with other systems for efficiency. The CMS reduces costs by eliminating paper-based processes while ensuring secure and professional certificate management. It's an eco-friendly, scalable solution for modern organizations.</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
