import React, { useState, useEffect, useMemo, createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import './css/App.css';

import { NavSidebar } from './components/NavSidebar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AMAPage from './pages/AMAPage';
import MainPage from './pages/MainPage';
import Intro from './components/main/Intro';
import Developer from './components/main/Developer';
import Mentor from './components/main/Mentor';
import Activist from './components/main/Activist';
import Contact from './components/Contact';

export const UserContext = createContext();

function App() {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [user, setUser] = useState(null);
  const context = useMemo(() => ({ user, setUser }), [user]);
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
      children: [
        {
          index: true,
          element: <Intro />,
        },
        {
          path: 'developer',
          element: <Developer />,
        },
        {
          path: 'mentor',
          element: <Mentor />,
        },
        {
          path: 'activist',
          element: <Activist />,
        },
      ],
    },
    {
      path: '/ama',
      element: <AMAPage handleOpenLogin={() => setOpenLogin(true)} handleOpenRegister={() => setOpenRegister(true)}/>,
    },
  ]);

  const closeModal = () => {
    setOpenLogin(false);
    setOpenRegister(false);
    setOpenContact(false);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={context}>
      <NavSidebar 
        handleOpenLogin={() => setOpenLogin(true)} 
        handleOpenRegister={() => setOpenRegister(true)} 
        handleOpenContact={() => setOpenContact(true)}
      />
      <div className='w-full absolute z-10 top-4 md:top-0 flex items-center justify-center'>
        <h5 className='major-mono-display text-5xl pl-6 pt-3'>
          <span className='text-white'>sARAH</span> <span className='text-white md:text-black'>MuRRAy</span>
        </h5>
      </div>
      <RouterProvider router={router} />
      <Register isOpen={openRegister} handleClose={closeModal} />
      <Login isOpen={openLogin} handleClose={closeModal} />
      <Contact isOpen={openContact} handleClose={closeModal} />
    </UserContext.Provider>
  );
}

export default App;
