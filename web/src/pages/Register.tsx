import React, { useState } from 'react';

interface Props {

}

export const Register: React.FC<Props> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
            <h1>Register</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                console.log('Form Submitted');
                console.log('Email', email);
                console.log('Password', password);
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

                <button type="submit">Register</button>
            </form>
        </>
    );
};