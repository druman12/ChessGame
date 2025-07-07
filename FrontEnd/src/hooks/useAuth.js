import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import base_url from '../URL.jsx';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userdetails, setUserdetails] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch(`${base_url}/api/auth/check`, {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(true);
                setUserdetails(data);
                console.log(data)
            } else {
                setIsAuthenticated(false);
                setUserdetails(null);
            }
        } catch (error) {
            setIsAuthenticated(false);
            setUserdetails(null);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (credential) => {
        try {
            const decoded = jwtDecode(credential);
            const response = await fetch(`${base_url}/api/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: decoded.email,
                    name: decoded.name
                })
            });

            if (response.ok) {
                setIsAuthenticated(true);
                setUserdetails({
                    email: decoded.email,
                    name: decoded.name
                });
                checkAuth();
            }
        } catch (error) {
            console.error('Authentication error:', error);
        }
    };

    return { isAuthenticated, loading, userdetails, handleGoogleLogin, checkAuth };
};