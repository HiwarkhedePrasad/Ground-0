import React from 'react';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">MyApp</h1>
      <div className="flex space-x-4">
        <LoginButton />
        <SignupButton />
      </div>
    </nav>
  );
};

export default Navbar;
