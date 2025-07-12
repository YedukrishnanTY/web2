import React, { useState } from 'react';
import { Login } from '../../services/Auth.services';
import { useNavigate } from 'react-router-dom';


// Main App component for the login page
export default function App() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Please enter both email and password.');
            return;
        }

        try {
            await Login({ email, password });
            setMessage('Login attempt successful! (Credentials logged to console)');

            navigate('/dashboard'); 
        } catch (error) {
            console.error('Submission error:', error);
            setMessage('Login attempt failed. Please try again.');
        } finally {
            setEmail('');
            setPassword('');
        }
    };


    return (
        // Main container for the login page, centered and full height
        <>
            {/* Login card container */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md display-flex flex-col items-center justify-center w-full mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
                    Welcome Back!
                </h2>

                {/* Login form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email input field */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="username or email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"

                        />
                    </div>

                    {/* Password input field */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"

                            aria-label="Password"
                        />
                    </div>


                    {/* Login button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-300 transform hover:scale-100"
                    >
                        Log In
                    </button>
                </form>

                {/* Message display area */}
                {message && (
                    <p className="mt-6 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        {message}
                    </p>
                )}
            </div>
        </>
    );
}
