import React, { useContext, useState } from 'react'
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


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{

        const response = await axios.post('https://taskify-backend-fc3q.onrender.com/users/register', {
            username,password
        });
         console.log(response);

        const token = response.data.token;

        if(response.data.success == true && token){
            toast.success(`Welcome ${response.data.username}`);
            login(token); 

         setTimeout(() =>{
           navigate('/');
         },2000);
       }
       else{
         toast.error(response.data.message);
       }
 
    }
    catch(err){
        toast.error(err);
        }
    }



    return (
            <div className='login-container'>
                {/* <div className="login-title-container">
                  
                </div> */}

                <form className='login-form' onSubmit={handleSubmit}>
                <h1 className='login-title'>Register</h1>
                    <input type="text" 
                    placeholder='Username' 
                    value={username}
                    className='cred-input' 
                    onChange={(e) => setUsername(e.target.value)}
                    />

                    <input type="password"
                     placeholder='Password' 
                     className='cred-input'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}

                      />

                    <Button className='login-btn' type='submit'>Submit</Button>

                    <div className="already-container">
                        <p>Already have an Account? </p>
                        <Link to='/login' className='no-underline'>Login</Link>
                    </div>

         
                </form>

                <ToastContainer position='top-right'/>
            </div>
    )
}

export default Login
