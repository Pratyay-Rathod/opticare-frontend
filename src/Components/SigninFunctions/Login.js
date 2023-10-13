import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../ReduxReducers/AuthActions';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [roleError, setRoleError] = useState("");
    const [loginEndpoint, setLoginEndpoint] = useState("");

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || username === "") {
            setUsernameError("Please Enter Username");
            return;
        }
        if (!password || password === "") {
            setPasswordError("Please Enter Password");
            return;
        }
        if (!role || role === "") {
            setRoleError("Please Select Your Role");
            return;
        }

        const user = { username, password }
        console.log(role);
        try {
            if (role === "admin") {
                const response = await axios.post(`http://localhost:8000/admin/login`, user);
                if (response.data) {
                    const {admin,token} = response.data;
                    dispatch({ type: "LOGIN_SUCCESS", payload: admin });
                    localStorage.setItem('jwt', token);
                    navigate("/adminDashboard")
                }
                else {
                    dispatch({ type: "LOGIN_FAILURE" });
                    localStorage.setItem('isAuthenticated', false);
                }
            }
            if (role === "staff") {
                const response = await axios.post(`http://localhost:8000/staff/login`, user);
                if(response){
                    if (response.data.user) {
                        const {user,token} = response.data;
                        console.log(user);
                        dispatch({ type: "LOGIN_SUCCESS", payload: user });
                        localStorage.setItem('jwt',token);
                        navigate("/displayPrescription")
                    }
                    else {
                        dispatch({ type: "LOGIN_FAILURE" });
                        localStorage.setItem('isAuthenticated', false);
                    }
                }
                else{
                    setError("Something went wrong");
                }
            }
        }
        catch (error) {
            console.log(error);
            if(error.response){
                if (error.response.data) {
                    const errorResponse = error.response.data;
                    if (errorResponse.errors.email !== "") {
                        setUsernameError("There is no user of this email");
                        dispatch({ type: "LOGIN_FAILURE" });
                    }
                    else if (errorResponse.errors.password !== "") {
                        setPasswordError("Password is incorrect");
                        dispatch({ type: "LOGIN_FAILURE" });
                    }
                    else {
                        setError("Something went wrong");
                        dispatch({ type: "LOGIN_FAILURE" });
                    }
                }
                else {
                    setError("Something went wrong");
                    dispatch(loginFailure());
                }
            }
            else{
                setError("Something went wrong");
            }
        }

    }

    return (
        <LoginContainer>
            <LoginForm>
                <>
                    <h1 style={{textAlign:"center"}}>Login</h1>
                    {error && <h2 style={{ color: "red" }}>{error}</h2>}
                    <RadioGroup>
                        <RadioLabel>
                            <input
                                type="radio"
                                value="admin"
                                checked={role === 'admin'}
                                onChange={handleRoleChange}
                                required
                            />
                            Admin
                        </RadioLabel>
                        <RadioLabel>
                            <input
                                type="radio"
                                value="staff"
                                checked={role === 'staff'}
                                onChange={handleRoleChange}
                                required
                            />
                            Doctor
                        </RadioLabel>
                    </RadioGroup>
                    {roleError && <ErrorMessage style={{ fontSize: "20px" }}>{roleError}</ErrorMessage>}
                </>
                <>
                    <Input type="text" placeholder='Email or Phone' min="6" onChange={(e) => {
                        setUsername(e.target.value);
                        setUsernameError("");
                    }} required />
                    {usernameError && <ErrorMessage style={{ fontSize: "20px" }}>{usernameError}</ErrorMessage>}
                    <Input type="password" placeholder='Password' onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                    }} required />
                    {passwordError && <ErrorMessage style={{ fontSize: "20px" }}>{passwordError}</ErrorMessage>}
                </>
                <>
                    <a href='fefdf' style={{color:"pink"}}>Forgot password?</a>
                    <Button onClick={handleLogin}>Login</Button>
                </>
            </LoginForm>
        </LoginContainer>
    );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  background-color: #2d2d30;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  margin:0 auto;
  h1{
        font-size:2rem;
        line-height:1;
        font-weight:300;
        color:white;
    }
    p{
        font-size:12px;
    }
    a{
        text-decoration:none;
        margin:100px 0;
        color: #white;
        font-size:15px;
    }
`;

const ErrorMessage = styled.p`
    color:red;
    @media (max-width: 768px) {
        &{
            margin:0;
        }
    }
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-align: center;
  justify-content: center;
`;

const RadioLabel = styled.label`
  margin-right: 10px;
`;

const Input = styled.input`
    margin:20px 0 10px 0;
    border:none;
    outline:none;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 10px;
    font-size: 16px;
    width:90%;
    border:1px solid gray;
    &:focus{
        border:1px solid blue;
    }
`;

const Button = styled.button`
        outline:none;
        background-color: #1260CC;
        border:none;
        height: 3rem;
        width:100%;
        align-items: center;
        border-radius:40px;
        color:white;
        margin-top:1rem;
        margin-bottom:2rem;
        font-size:18px;
`;

export default Login;
