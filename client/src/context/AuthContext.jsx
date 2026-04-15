import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hydrate state from localStorage on mount
        const userString = localStorage.getItem('aryan_user');
        if (userString) {
            try {
                setUser(JSON.parse(userString));
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                localStorage.removeItem('aryan_user');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('aryan_user', JSON.stringify(userData));
        if (userData.token) {
            localStorage.setItem('aryan_token', userData.token);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('aryan_user');
        localStorage.removeItem('aryan_token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
