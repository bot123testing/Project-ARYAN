import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [role, setRole] = useState('Citizen');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();
    const { login } = useAuth();

    const roles = ['Citizen', 'NGO', 'Admin'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: '', type: '' });

        try {
            if (isLoginMode) {
                // Handle Login
                const res = await axios.post('http://localhost:5000/api/auth/login', { email, password, role });
                
                // Use context login
                login(res.data);

                // Role-based redirection
                if (res.data.role === 'NGO') {
                    navigate('/ngo-dashboard');
                } else if (res.data.role === 'Admin') {
                    navigate('/admin');
                } else {
                    navigate('/'); // Citizen homepage
                }
            } else {
                // Handle Registration
                const res = await axios.post('http://localhost:5000/api/auth/register', { email, password, role });
                setMessage({ text: 'Success! Your account has been created. You can now log in.', type: 'success' });
                setIsLoginMode(true); // Switch to login after successful registration
            }
        } catch (error) {
            setMessage({ 
                text: error.response?.data?.message || 'An error occurred. Please try again.', 
                type: 'error' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Side - Visual/Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-blue-700 items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600 opacity-95"></div>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                
                <div className="relative z-10 p-12 text-white max-w-lg text-center">
                    <h1 className="text-4xl font-extrabold mb-6 tracking-tight">ARYAN Network</h1>
                    <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                        The unified public welfare portal bridging the gap between citizens, NGOs, and government resources.
                    </p>
                    <div className="flex justify-center gap-6">
                        <div className="px-6 py-4 bg-blue-800/40 rounded-xl backdrop-blur-sm border border-blue-400/20">
                            <span className="block font-bold text-3xl">10K+</span>
                            <span className="text-sm font-medium text-blue-200 mt-1 block">Verified NGOs</span>
                        </div>
                        <div className="px-6 py-4 bg-blue-800/40 rounded-xl backdrop-blur-sm border border-blue-400/20">
                            <span className="block font-bold text-3xl">5M+</span>
                            <span className="text-sm font-medium text-blue-200 mt-1 block">Citizens Aided</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login/Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
                <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 relative">
                    <div className="lg:hidden text-center mb-6">
                        <h2 className="text-2xl font-bold text-blue-700">ARYAN Portal</h2>
                    </div>

                    <div className="text-left mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            {isLoginMode ? 'Access Portal' : 'Create Account'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-2 font-medium">
                            {isLoginMode ? 'Log in to your account to continue.' : 'Join the network to discover and provide aid.'}
                        </p>
                    </div>

                    {message.text && (
                        <div className={`p-4 mb-6 text-sm rounded-lg ${message.type === 'error' ? 'bg-red-50 text-red-800 border-l-4 border-red-500' : 'bg-green-50 text-green-800 border-l-4 border-green-500'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selection */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">I am a</label>
                            <div className="flex p-1 bg-gray-100/80 rounded-lg">
                                {roles.map((r) => (
                                    <button
                                        type="button"
                                        key={r}
                                        onClick={() => setRole(r)}
                                        className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                                            role === r
                                                ? 'bg-white text-blue-700 shadow-sm border border-gray-200/60'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                                        }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-colors"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="block text-sm font-semibold text-gray-700" htmlFor="password">Password</label>
                                    {isLoginMode && (
                                        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-semibold tracking-tight transition-colors">Forgot password?</a>
                                    )}
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-colors"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3.5 px-4 mt-2 ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center`}
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                isLoginMode ? 'Log In' : 'Sign Up'
                            )}
                        </button>
                    </form>

                    {/* Toggle Mode Display */}
                    <p className="mt-8 text-center text-sm font-medium text-gray-500">
                        {isLoginMode ? "Don't have an account yet?" : "Already have an account?"} {' '}
                        <button 
                            type="button" 
                            onClick={() => {
                                setIsLoginMode(!isLoginMode);
                                setMessage({ text: '', type: '' });
                            }} 
                            className="text-blue-600 hover:text-blue-800 font-bold transition-colors focus:outline-none"
                        >
                            {isLoginMode ? 'Sign up here' : 'Log in here'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
