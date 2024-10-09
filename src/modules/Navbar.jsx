// Navbar.js
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className=" shadow">
            <div className="container mx-auto">
                <div className="flex justify-between items-center py-4 px-2">
                    <h1 className="text-xl font-semibold">Ground-0</h1>
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-500 hover:text-gray-600 focus:outline-none"
                            aria-label="Open mobile menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <div className="flex items-center">
                                <img
                                    src={user.picture}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="ml-2">{user.name}</span>
                                <button
                                    onClick={() => logout({ returnTo: window.location.origin })}
                                    className="ml-4 bg-red-600 text-white px-2 py-1 rounded"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => loginWithRedirect()}
                                    className="bg-blue-600 text-white px-3 py-2 rounded"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                                    className="bg-blue-600 text-white px-3 py-2 rounded"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden  shadow-lg px-4 py-2">
                    {isAuthenticated ? (
                        <div className="flex items-center">
                            <img
                                src={user.picture}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="ml-2">{user.name}</span>
                            <button
                                onClick={() => logout({ returnTo: window.location.origin })}
                                className="ml-4 bg-red-600 text-white px-2 py-1 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <button
                                onClick={() => loginWithRedirect()}
                                className="bg-blue-600 text-white px-3 py-2 rounded mb-2"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                                className="bg-blue-600 text-white px-3 py-2 rounded"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
