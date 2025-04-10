import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if username and password match the predefined values
        if (username === import.meta.env.VITE_APP_UserName && password === import.meta.env.VITE_APP_Password) {
            // Navigate to '/home' if the credentials are correct
            navigate('/home');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
            <div className="bg-[#fdf6ec] rounded-xl p-10 max-w-md mx-auto shadow-lg border border-yellow-200">
                <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🕉️</div>
                    <h2 className="text-2xl font-semibold text-[#5e3a1b] font-serif">
                        Admin Login
                    </h2>
                    <p className="text-sm text-gray-600 italic">Sacred Access Panel</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#5e3a1b' } }}
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#5e3a1b' } }}
                    />
                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-600 hover:to-orange-500 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
                        >
                            ENTER
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
