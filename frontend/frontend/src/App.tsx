import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainApp from './components/Main/MainApp';
import { useEffect } from 'react';
import Register from './components/Register/Register';
import Token from './components/Register/Token';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login/Login';
import { userStore } from './store/store';

function App() {


  useEffect(() => {
      document.body.style.backgroundColor = '#FFFFFF';
  }, [location.pathname]);
  
  const {user} = userStore()



  return (
    <>
          <div className='mt-8'>
            <Routes>       
            <Route path="/" element={!user? <Navigate to="/login" replace /> : <MainApp />} />   
              <Route path="/register" element={<Register />} />   
              <Route path="/login" element={<Login />} />   
              <Route path="/token" element={<Token />} />   
            </Routes>
            <ToastContainer />
          </div>
    </>
  )
}

export default App
