import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const AdminNavBar = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if (token && token !== null) {
      console.log("token is there");
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
    console.log("logout success");
    navigate("/adminDashboard")

  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <Logo>EyeCare</Logo>
      <MenuToggle onClick={toggleMenu}>
        <Bar />
        <Bar />
        <Bar />
      </MenuToggle>
      <NavbarLink href="/" isOpen={isOpen}>
        Home
      </NavbarLink>
      <NavbarLink href="/dashboard" isOpen={isOpen}>
        Dashboard
      </NavbarLink>
      <NavbarLink href="/search" isOpen={isOpen}>
        Search Quick Inventory
      </NavbarLink>
      {isAuthenticated ? <NavbarLink onClick={handleLogout}>Logout</NavbarLink> : null}
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  background-color: pink;
  color: #101010;
  display: flex;
  align-items: center;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  margin-right: 20px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const NavbarLink = styled.a`
  color: #101010;
  text-decoration: none;
  margin-right: 20px;
  cursor: pointer; /* Set the cursor style to pointer */

  &:hover {
    color: #080808;
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }
`;


const MenuToggle = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Bar = styled.div`
  width: 25px;
  height: 3px;
  background-color: #fff;
  margin-bottom: 4px;
`;

export default AdminNavBar;