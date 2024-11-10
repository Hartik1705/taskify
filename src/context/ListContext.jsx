// import React, { createContext, useContext, useEffect, useState } from 'react'
// import { AuthContext } from './AuthContext';
// import axios from 'axios';

// export const ListContext = createContext();


// const ListProvider = (props) => {

//     const {isAuthenticated} = useContext(AuthContext);

//     const [list, setList] = useState([]);

//     useEffect(()=>{
//         const token = localStorage.getItem('token');
//         const response = axios.get('http://localhost:4000/task/show',{
//             token
//         });

//         console.log(response);

//     },[])


//   return (
//     <ListContext.Provider >
//         {props.children}
//     </ListContext.Provider>
//   )
// }

// export default ListProvider
