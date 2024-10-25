import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import "./navbar.css";
import AccountModal from "../AccountModal";
import homeLogo from "./imageLogo.png";
import { useNavigate } from "react-router-dom";
import Account from "../Account/Account";

const AppNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      navigate("/Certificate-Verification-System/");
    }
  };

  useEffect(() => {
    // Check if the user is authenticated
    const loggedIn = localStorage.getItem("token") === undefined ? false : true;
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Navbar expand="lg" className="shadow-sm navbar-custom h-16">
      <Container>
        <Navbar.Brand href="/" className="brand-custom">
          <div className="insideNav d-flex align-items-center justify-content-center">
            <img className="imgLogo" src={homeLogo} alt="" />
            <h2 className="oxanium px-1 my-3 heading-custom">
              Certificate Verification System
            </h2>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler-custom"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="flex justify-content-end"
            style={{ width: "100%", justifyContent: "center" }}
          >
            {isLoggedIn && (
              <div className="d-flex align-items-center">
                {/* Account Link */}
                <button
                  onClick={handleOpenModal}
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md transition-all duration-300 mr-3"
                >
                  Account
                </button>
                <AccountModal isOpen={isModalOpen} onClose={handleCloseModal}>
                  <Account />
                </AccountModal>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="logout-button px-4 py-2 mx-2 rounded-md transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export default AppNavbar;

// import React, { useState } from "react";
// import { Container, Navbar, Nav } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// import "./navbar.css";
// import homeLogo from "./imageLogo.png"

// const AppNavbar = () => {

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   return (
//     <Navbar expand="lg" className="shadow-sm navbar-custom h-16">
//       <Container>
//         <Navbar.Brand href="/" className="brand-custom">
//         <div className="insideNav d-flex align-items-center justify-content-center">
//         <img className="imgLogo" src={homeLogo} alt="" />
//         <h2 className="oxanium px-1 my-3" >Certificate Verification System</h2>
//       </div>
//         </Navbar.Brand>
//         <Navbar.Toggle
//           aria-controls="basic-navbar-nav"
//           className="navbar-toggler-custom"
//         />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav
//             className="ml-auto mx-auto"
//             style={{ width: "100%", justifyContent: "center" }}
//           >
//             <LinkContainer to="/Certificate-Verification-System/">
//               <Nav.Link>Home</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/Certificate-Verification-System/account">
//               <Nav.Link>Account</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/Certificate-Verification-System/student">
//               <Nav.Link>Dashboard</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/Certificate-Verification-System/admin">
//               <Nav.Link>Admin</Nav.Link>
//             </LinkContainer>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default AppNavbar;
