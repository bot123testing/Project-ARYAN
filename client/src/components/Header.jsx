import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, User } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-blue-400 rounded-lg flex items-center justify-center text-white text-lg">A</div>
                    ARYAN
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
                    <Link to="/" className="hover:text-primary transition">Home</Link>
                    <Link to="/find-aid" className="hover:text-primary transition">Find Aid</Link>
                    <Link to="/map" className="hover:text-primary transition">Live Map</Link>
                    <Link to="/about" className="hover:text-primary transition">About</Link>
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary">
                        <Globe size={18} /> EN
                    </button>
                    <button className="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                        Login
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t p-4 flex flex-col space-y-4 shadow-lg">
                    <Link to="/" className="text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/find-aid" className="text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>Find Aid</Link>
                    <Link to="/map" className="text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>Live Map</Link>
                    <button className="bg-primary text-white px-5 py-2 rounded-lg font-semibold w-full">
                        Login
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
