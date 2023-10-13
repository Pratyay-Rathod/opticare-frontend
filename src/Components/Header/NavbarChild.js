import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ParentNavComponent = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    props.setIsAuthenticated(false);
    console.log("logout success");
    navigate("/adminDashboard");
  };

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
      {props.isAuthenticated ? <NavbarLink onClick={handleLogout}>Logout</NavbarLink> : null}
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  background-color: #020c24;
  color: white;
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
  color: white;
  text-decoration: none;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    color: #820c4d;
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

export default ParentNavComponent;
