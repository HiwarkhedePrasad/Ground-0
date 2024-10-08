import React from 'react';
import LoginBtn  from './loginbtn';
import SignupButton from './Signup';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">MyApp</h1>
      <div className="flex space-x-4">
        <LoginBtn  />
        <SignupButton />
      </div>
    </nav>
  );
};

export default Navbar;
