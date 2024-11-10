import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/component-styles/Navbar.css';
import { AuthContext } from '../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Navbar = () => {
  const navigate = useNavigate();
  const {isAuthenticated,logout} = useContext(AuthContext);

  useEffect(() =>{
    if(isAuthenticated){
      navigate('/');
    }
}, [navigate])

  const handleLogOut = () =>{
    logout();
    navigate('/login');
  }

  return (
    <div className='navbar-container'>
        <div className="logo-heading">
            <h1>Taskify</h1>
        </div>

      {isAuthenticated 
      
      ? <> 
      <AccountCircleIcon fontSize="large" className='user-icon'/>
      <button onClick={handleLogOut} className="logout-btn">
        LOG OUT
      </button>
      </>
      
      : <div className="navbar-link-container">
      <ul>
         <Link to='/login' className='no-underline'>Log in</Link>
      </ul>
  </div> 
}
       
    </div>
  )
}

export default Navbar
