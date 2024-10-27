import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <div className='dark:bg-slate-300 dark:text-black'>
  <App />
  </div>
  </BrowserRouter>
    
 
);
