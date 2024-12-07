import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import EmailVerification from "./components/EmailVerification";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import { Toaster } from "sonner";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import Login from "./components/Login";
import LoadingSpinner from "./components/LoadingSpinner";
import ResetPassword from "./components/ResetPassword";
import { AdminDashboard } from "./components/AdminDashboard";
import AddBooks from './components/AddBooks';
import UpdateBook from "./components/UpdateBook";
import AllBooks from "./components/AllBooks";
import BookDetails from "./components/BookDetails";
import Cart from "./components/Cart";
import Layout from "./components/Layout";

//protect routes that require authentication
const ProtectedRoute = ({ children, role}) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user || !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/" replace />; // Redirect to home or any other page
  }
  return children;
};

// redirect authenticated users to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
     <BrowserRouter>
      <Routes>
      <Route
          path="/"
          element={
          
              <Layout />
         
          }
        >
        <Route
          
          index 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/course" element={<Courses />} />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
       
           <Route
          path="/book-details/:id"
          element={
            <ProtectedRoute>
             <BookDetails/>
            </ProtectedRoute>
             
            
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
               <AdminDashboard/>
            </ProtectedRoute>
             
            
          }
        />
         <Route
          path="/create-book"
          element={
            <ProtectedRoute role="admin">
               <AddBooks/>
            </ProtectedRoute>
             
            
          }
        />
          <Route
          path="/update-book/:id"
          element={
            <ProtectedRoute role="admin">
              <UpdateBook/>
            </ProtectedRoute>
             
            
          }
        />

<Route
          path="/all-books"
          element={
            <ProtectedRoute role='admin'>
              <AllBooks/>
            </ProtectedRoute>
             
            
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart/>
            </ProtectedRoute>
             
            
          }
        />
   </Route>
      </Routes>
    
      <Toaster richColors position="top-center" closeButton />
      
    
    </BrowserRouter>
  );
}

export default App;
