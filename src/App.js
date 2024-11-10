import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Dashboard from './Pages/Dashboard.jsx'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
import Register from './Pages/Register'

const App = () => {
  return (
    <div>
      <Navbar />
     <Routes>
      <Route path='/' element ={<Dashboard />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
     </Routes>
    </div>
  )
}

export default App
