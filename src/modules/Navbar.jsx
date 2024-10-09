import React, { useState } from 'react';
import LoginBtn from './loginbtn';
import SignupButton from './Signup';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 text-white bg-gray-800 shadow-md">
      <h1 className="text-2xl font-bold">Ground-0</h1>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4">
        <LoginBtn />
        <SignupButton />
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? '✖️' : '☰'} {/* Hamburger icon */}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-gray-700 rounded-md shadow-lg p-4 transition-transform transform translate-x-0">
          <LoginBtn />
          <SignupButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
