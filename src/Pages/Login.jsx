import React, { useContext, useEffect, useState } from 'react';
import '../styles/pages-styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircleLoader from "react-spinners/CircleLoader";
import axios from 'axios';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const response = await axios.post('https://taskify-backend-fc3q.onrender.com/users/login', {
                username, password
            });

            const token = response.data.token;
            if (response.data.success && token) {
                toast.success(`Welcome ${response.data.username}`);
                login(token);
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
        } finally {
            setLoading(false); 
        }
    }

    return (
        <div className='login-container'>
            {loading ? (
                <div className="spinner-container">
                    <CircleLoader
                        color="purple"
                        loading={loading}
                        size={200}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <p className="loading-text">Loading...</p>
                </div>
            ) : (
                <form className='login-form' onSubmit={handleSubmit}>
                    <h1 className='login-title'>Login</h1>
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        className='cred-input'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        className='cred-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button className='login-btn' type='submit'>Submit</Button>

                    <div className="already-container">
                        <p>Don't have an Account? </p>
                        <Link to='/register' className='no-underline'>Register</Link>
                    </div>
                </form>
            )}

            <ToastContainer position="top-right" autoClose={1000} />
        </div>
    );
}

export default Login;
