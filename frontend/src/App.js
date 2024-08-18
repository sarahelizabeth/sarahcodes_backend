import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Button, CustomProvider, Container } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import './css/App.css';

import { NavSidebar } from './components/NavSidebar';
import MainPage from './pages/MainPage';
import Developer from './components/main/Developer';
import AMAPage from './pages/AMAPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: 'developer',
        element: <Developer />,
      },
    ],
  },
  {
    path: '/ama',
    element: <AMAPage />,
  },
]);

function App() {
  return (
    <>
      <NavSidebar />
      <div className='w-full absolute z-10 top-0 flex items-center justify-center'>
        <h5 className='major-mono-display text-5xl pl-6 pt-3'>
          <span className='text-white'>sARAH</span> <span className='text-white md:text-black'>MuRRAy</span>
        </h5>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
