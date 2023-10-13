import React from "react";
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {

  return (
    <Container>
      <Options>
        <Box>
          <NavLink to="/adminAddPrescription">
            <Heading>Add Prescription</Heading>
          </NavLink>
        </Box>
        <Box>
          <NavLink to="/AddStaff">
            <Heading>Add Staff</Heading>
          </NavLink>
        </Box>
        <Box>
          <NavLink to="/displayStaffs">
            <Heading>Display All Staffs</Heading>
          </NavLink>
        </Box>
        <Box>
          <NavLink to="/AddAdmin">
            <Heading>Add Admin</Heading>
          </NavLink>
        </Box>
        <Box>
          <NavLink to="/displayAdmins">
            <Heading>Display All Admins</Heading>
          </NavLink>
        </Box>
        <Box>
          <NavLink to="/adminDisplayPrescription">
            <Heading>See All Prescription</Heading>
          </NavLink>
        </Box>
      </Options>
    </Container>
  );
}

const Container = styled.div``;
const Options = styled.div`
  margin-top: 10px;
  display:flex;
  justify-content: space-around;
`;

const Box = styled.div`
  width: 200px;
  height: 60px; /* Adjusted height to 100px */
  background-color: #43464d;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.3);
  margin: 10px;
  border-radius: 10px;
  text-align: center;
  a{
    text-decoration: none;
    color:white;
  }
`;

const Heading = styled.p`
  text-align: center;
  font-size: 18px;
`;

export default AdminDashboard;