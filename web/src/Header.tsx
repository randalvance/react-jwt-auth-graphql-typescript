import React from 'react';
import { Link } from 'react-router-dom';
import { useMeQuery } from './generated/graphql';

export const Header: React.FC = () => {
    const { data } = useMeQuery({ fetchPolicy: 'network-only' });

    return (
        <header>
          <h1>My Awesome Site</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/bye">Bye</Link></li>
              {data && data.me ? (<div>You are logged in as {data.me.email}</div>) : 'Not logged in.'}
            </ul>
          </nav>
        </header>
    );
}