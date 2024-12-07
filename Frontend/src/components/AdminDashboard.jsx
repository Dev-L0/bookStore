import { Link, useNavigate } from 'react-router-dom'
import AllBooks from './AllBooks';
import { useAuthStore } from '../../store/authStore';
export const AdminDashboard = () => {
 const {logout} = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = ()=>{
    logout();
    navigate('/login');
  }
  return (
    <>
    {/* <div className="navbar  bg-base-100">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><Link to='/create-book'>Add Book</Link></li>
        </ul>
      </div>
      <a className="btn btn-ghost text-xl">bookStore</a>
    </div>
    <div className="navbar-center hidden md:flex">
      <ul className="menu menu-horizontal px-1 gap-5">
          <Link to='/create-book'>Add Book</Link>

      </ul>
    </div>
    <div className="navbar-end">
      <button onClick={handleLogout}>Logout</button>
    </div>
   
  
    
  </div> */}
   <div>
   <AllBooks/>
 </div>
  </>
  )
}
