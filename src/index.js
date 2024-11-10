import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter future={{ v7_startTransition: true }}>
    <AuthProvider>
        <App />
    </AuthProvider>
    </BrowserRouter>
);

