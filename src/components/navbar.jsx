import React from 'react';
import { Link } from 'react-router-dom'; // Ensure this is imported
import { Globe } from 'lucide-react'; // Import Globe icon

const Navbar = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                        <h1 className="text-lg sm:text-xl font-bold text-gray-900">DevConnect</h1>
                    </div>
                    <nav className="hidden sm:flex items-center gap-4 sm:gap-6">
                        <Link to="/" className="text-gray-600 hover:text-gray-900">
                            Home
                        </Link>
                        <Link to="/search-location" className="text-gray-600 hover:text-gray-900">
                            Search by Location
                        </Link>
                        <Link to="#" className="text-gray-600 hover:text-gray-900">
                            Events
                        </Link>
                        <Link to="#" className="text-gray-600 hover:text-gray-900">
                            Messages
                        </Link>
                        <button className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Sign In
                        </button>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Navbar;