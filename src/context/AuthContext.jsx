import React, { createContext, useEffect, useState } from 'react'


export const AuthContext = createContext();

const AuthProvider = (props) => {

  const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() =>{

      const token = localStorage.getItem('token');
      if(token){
        setAuthenticated(true);
      }

    }, [])


    const login = (token) =>{
        localStorage.setItem('token', token);
        setAuthenticated(true);
    }



  const logout= () =>{
    localStorage.removeItem('token');
    setAuthenticated(false);
  }




  return (
      <AuthContext.Provider value = {{isAuthenticated,logout,login}}>
          {props.children}
      </AuthContext.Provider>

  )
}

export default AuthProvider;
