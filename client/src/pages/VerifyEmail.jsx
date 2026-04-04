import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Verifying your email...');

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await axios.post('http://localhost:5000/api/auth/verify', { token });
                setStatus(res.data.message || 'Verification successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 3000);
            } catch (error) {
                setStatus(error.response?.data?.message || 'Verification failed. The link might be expired.');
            }
        };
        verifyToken();
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verification</h2>
                <p className="text-gray-600 mb-6">{status}</p>
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto opacity-50"></div>
            </div>
        </div>
    );
};

export default VerifyEmail;
