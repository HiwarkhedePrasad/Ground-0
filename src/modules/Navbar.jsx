import React, { useState } from 'react';
import LoginBtn from './loginbtn';
import SignupButton from './Signup';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-700 text-white"> {/* Darker background */}
      <h1 className="text-2xl font-bold">Ground-0</h1>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6"> {/* Increased space between buttons */}
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
      <div 
        className={`absolute top-16 right-0 bg-blue-800 rounded-md shadow-lg p-4 md:hidden transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <LoginBtn />
        <SignupButton />
      </div>
    </nav>
  );
};

export default Navbar;
