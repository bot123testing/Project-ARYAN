import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const isNGO = user?.role === 'NGO';
    const isCitizen = user?.role === 'Citizen' || (user && !user.role); // Default to citizen if user exists but role missing
    const isGuest = !user;

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo - Dynamic Routing */}
                <Link 
                    to={isNGO ? "/ngo-dashboard" : "/"} 
                    className="text-2xl font-bold text-primary flex items-center gap-2"
                >
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-blue-400 rounded-lg flex items-center justify-center text-white text-lg">A</div>
                    ARYAN
                </Link>

                {/* Desktop Nav - Role-Based Links */}
                <nav className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
                    {isGuest ? (
                        null // No links for guests as per Task 1
                    ) : isNGO ? (
                        <>
                            <Link to="/ngo-dashboard" className="hover:text-primary transition underline-offset-4 decoration-2">Dashboard</Link>
                            <Link to="/ngo-inventory" className="hover:text-primary transition underline-offset-4 decoration-2">Inventory</Link>
                            <Link to="/ngo-aid-requests" className="hover:text-primary transition underline-offset-4 decoration-2">Aid Requests</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="hover:text-primary transition underline-offset-4 decoration-2">Home</Link>
                            <Link to="/eligibility" className="hover:text-primary transition underline-offset-4 decoration-2">Eligibility</Link>
                            <Link to="/map" className="hover:text-primary transition underline-offset-4 decoration-2">Live Map</Link>
                            <Link to="/about" className="hover:text-primary transition underline-offset-4 decoration-2">About</Link>
                        </>
                    )}
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center space-x-6">
                    <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
                        <Globe size={18} /> EN
                    </button>
                    
                    {isGuest ? (
                        <Link to="/login" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95">
                            Login
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-primary font-bold bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                                <User size={18} />
                                <span className="max-w-[150px] truncate">{user.name || (isNGO ? 'NGO Admin' : 'Citizen')}</span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-gray-600 p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
                    {!isGuest && (
                        <div className="pb-4 border-b border-gray-100 mb-2">
                            <div className="flex items-center gap-3 text-primary font-bold">
                                <User size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Logged in as</p>
                                    <p>{user.name || (isNGO ? 'NGO Admin' : 'Citizen')}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col space-y-4">
                        {isGuest ? (
                            null // No links for guests
                        ) : isNGO ? (
                            <>
                                <Link to="/ngo-dashboard" className="text-gray-700 font-semibold text-lg" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                                <Link to="/ngo-inventory" className="text-gray-700 font-semibold text-lg" onClick={() => setIsMenuOpen(false)}>Inventory</Link>
                                <Link to="/ngo-aid-requests" className="text-gray-700 font-semibold text-lg" onClick={() => setIsMenuOpen(false)}>Aid Requests</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="text-gray-700 font-semibold text-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
                                <Link to="/eligibility" className="text-gray-700 font-semibold text-lg" onClick={() => setIsMenuOpen(false)}>Eligibility</Link>
                                <Link to="/map" className="text-gray-700 font-semibold text-lg" onClick={() => setIsMenuOpen(false)}>Live Map</Link>
                                <Link to="/about" className="text-gray-700 font-semibold text-lg" onClick={() => setIsMenuOpen(false)}>About</Link>
                            </>
                        )}
                    </div>

                    <div className="pt-4 mt-2">
                        {isGuest ? (
                            <Link 
                                to="/login" 
                                className="bg-primary text-white py-3 rounded-xl font-bold w-full text-center block shadow-lg shadow-blue-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        ) : (
                            <button 
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 transition"
                            >
                                <LogOut size={20} /> Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
