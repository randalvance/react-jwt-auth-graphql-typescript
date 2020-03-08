import React, { useState, useEffect } from 'react';
import { Routes } from './Routes';
import { setAccessToken } from './accessToken';

export const App: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/refresh-token', {
            method: 'POST',
            credentials: 'include',
        })
            .then(async resp => {
                const { accessToken } = await resp.json();
                setAccessToken(accessToken);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return <Routes />;
}