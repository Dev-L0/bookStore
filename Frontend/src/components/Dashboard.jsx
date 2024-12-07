import React from 'react'
import { useAuthStore } from '../../store/authStore'
import { formatDate } from '../../utils/formatDate.js';
import { useNavigate, Link } from 'react-router-dom';


const Dashboard = () => {
    const {user, logout} = useAuthStore();
    const navigate = useNavigate();
    const handleLogout = ()=>{
      logout();
      navigate('/login');
    }
  return (
    <div className="max-full mx-auto w-full h-screen flex flex-col justify-center items-center"><div className='space-y-6 bg-slate-900 rounded-xl shadow-2xl border border-gray-800  p-10'><h2 className='text-2xl text-bold text-center mb-3'>Dashboard</h2><div className='bg-slate-800 rounded-lg p-5'><h3 className='text-xl font-semibold'>Profile Information</h3><p className='text-white'>Name: {user.name}</p>
    <p className='text-white'>Email: {user.email}</p>
</div>
    <div className='bg-slate-800 rounded-lg p-5'>
    <h3 className='text-xl font-semi-bold mb-3 text-white'>Account Activity</h3>
    <p><span className='font-bold'>Joined: </span>
    {new Date(user.createdAt).toLocaleString('en-US',{
        year:'numeric',
        month:'long',
        day:'numeric',
    })}</p>
    <p className='text-white '><span>Last Login:</span> {formatDate(user.lastLogin)}</p>
    </div>
    <div className='flex justify-between'><button className="text-sm flex items-center justify-center border mt-5 rounded-xl p-3 h-10 mx-auto cursor-pointer border border-slate-400 bg-slate-400 text-black " onClick={handleLogout}>Logout</button>
    <Link className="text-sm flex items-center justify-center border mt-5 rounded-xl p-3 h-10 mx-auto cursor-pointer border border-slate-400 bg-slate-400 text-black " to='/'>Back</Link>
    </div>
    </div>
    </div>
  )
}

export default Dashboard