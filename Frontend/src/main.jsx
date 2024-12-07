import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 
  <div className='dark:bg-slate-300 dark:text-black'>
  <App />
  </div>
  
  </React.StrictMode>

    
 
);
