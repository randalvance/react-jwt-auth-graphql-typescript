import React from 'react';
import { Link } from 'react-router-dom';

interface Props {

}

export const Home: React.FC<Props> = () => {
    return (
        <>
            <h1>Home</h1>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </>
    );
};