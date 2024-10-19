import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "./login.css"; // Import custom CSS

import { useNavigate } from "react-router-dom";

const Login = () => {
  //const { handleLogin } = useOutletContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      const userData = response.data.userData;

      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        // Redirect based on role
        const role = response.data.role;
        if (role === "Student") {
          navigate("/student", { state: { userData } });
        } else if (role === "Admin") {
          navigate("/admin", { state: { userData } });
        }
      } else {
        setError("Login failed. Please check your credentials.");
        setSuccess(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
      setSuccess(false);
    }
  };

  return (
    <div>
     
      <Container
        className="mt-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="login-form border p-4 rounded">
          <h2 className="text-center mb-4" style={{ color: "#364bc5" }}>
            Login
          </h2>
          {success && (
            <Alert variant="success">Login successful! Redirecting...</Alert>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
