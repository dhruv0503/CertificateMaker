import React from "react";
import { Container } from "react-bootstrap";

import "./home.css";
import homeImage from "./homeIMG.jpeg";
import Login from "../Auth/login";
import AppNavbar from "../Header/navbar";

//import homeLogo from "./imageLogo.png"

const Home = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 64px)",
      }}
    >
      <div>
            <AppNavbar />
        <div className="main">
          <div className="mainBody">
            <div className="content">
              <img className="img1" src={homeImage} alt="photo" />
              <div
                style={{
                  backgroundImage: "url(assets/overlay_4.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "calc(100vh - 64px)",
                }}
              >
                <Login />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
