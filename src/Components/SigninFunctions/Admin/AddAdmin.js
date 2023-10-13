import React, {  useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setemailError] = useState();

  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (!username || username === "") {
      setUsernameError("Please Enter Username");
      return;
    }
    if (!password || password === "") {
      setPasswordError("Please Enter Password");
      return;
    }
    if (!email || setemail === "") {
      setemailError("Please Enter Admin's Email Id");
      return;
    }
    const user = { username, password, email };
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/signup",
        user
      );
      if (response.status == 201) {
        toast.success("Staff Addedd Successfully");
        setUsername("");
        setPassword("");
        setemail("");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          const errorResponse = error.response.data;
          if (errorResponse.errors.email !== "") {
            setUsernameError(
              "There is already staff present with this username"
            );
          } else {
            toast.error("Something went wrong please try again latter");
          }
        }
      } else {
        toast.error("Something went wrong please try again latter");
      }
    }
  };
  return (
    <>
      <LoginContainer>
        <ToastContainer position="top-center" theme="dark" />
        <LoginForm>
          <>
            <h1 style={{ textAlign: "center",color:"white" }}>Add Admin</h1>
            <Input
              type="text"
              placeholder="Email or Phone"
              value={username}
              min="6"
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
              required
            />
            {usernameError && (
              <ErrorMessage style={{ fontSize: "20px" }}>
                {usernameError}
              </ErrorMessage>
            )}
            <Input
              type="email"
              placeholder="Admin Email Id"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
                setemailError("");
              }}
              required
            />
            {passwordError && (
              <ErrorMessage style={{ fontSize: "20px" }}>
                {passwordError}
              </ErrorMessage>
            )}
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              required
            />
            {passwordError && (
              <ErrorMessage style={{ fontSize: "20px" }}>
                {passwordError}
              </ErrorMessage>
            )}
          </>
          <>
            <Button onClick={handleAddStaff}>Add Admin</Button>
          </>
        </LoginForm>
      </LoginContainer>
    </>
  );
};

export default AddAdmin;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  margin: 40px 0px;
`;

const LoginForm = styled.form`
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  background-color: #2d2d30;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  margin: 0 auto;
  color:white;
  h1 {
    font-size: 2rem;
    line-height: 1;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.9);
  }
  p {
    font-size: 12px;
  }
  a {
    text-decoration: none;
    margin: 100px 0;
    color: #00239c;
    font-size: 15px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  @media (max-width: 768px) {
    & {
      margin: 0;
    }
  }
`;

const Input = styled.input`
  margin: 20px 0 10px 0;
  border: none;
  outline: none;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 10px;
  font-size: 16px;
  width: 90%;
  border: 1px solid gray;
  &:focus {
    border: 1px solid blue;
  }
`;

const Button = styled.button`
  outline: none;
  background-color: #1260cc;
  border: none;
  height: 3rem;
  width: 100%;
  align-items: center;
  border-radius: 40px;
  color: white;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 18px;
`;
