import React, { useContext, useEffect, useState } from 'react'
import '../styles/pages-styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
       
            navigate('/');
        }
    }, [navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/users/login', {
                username, password
            });
            console.log(response);

            const token = response.data.token;
            if (response.data.success && token) {
                toast.success(`Welcome ${response.data.username}`);
                login(token);
                setTimeout(() =>{
                    navigate('/');
                },2000)
           
            } else {
                toast.error(response.data.message);
                navigate('/login');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
        }
    }

    return (
        <div className='login-container'>
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

            <ToastContainer
                position="top-right"
            />
        </div>
    )
}

export default Login;
