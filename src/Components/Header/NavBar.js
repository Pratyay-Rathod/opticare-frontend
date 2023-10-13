import React, { useState } from 'react';
import ParentNavComponent from './NavbarChild';

const ParentComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('jwt'));

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
    console.log("logout success");
  };

  return (
    <div>
      <ParentNavComponent 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
        handleLogout={handleLogout} 
      />
    </div>
  );
};

export default ParentComponent;
