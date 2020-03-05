import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useLoginMutation } from '../generated/graphql';

export const Login: React.FC<RouteComponentProps> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation()

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={async (e) => {
                e.preventDefault();
                const response = await login({
                    variables: {
                        email,
                        password
                    }
                });
                console.log(response.data?.login.accessToken);
            }}>
                <div>
                    <input
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </>
    );
};