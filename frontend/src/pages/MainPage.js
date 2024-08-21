import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const MainPage = () => {
  const [selected, setSelected] = useState(null);

  let location = useLocation();

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  return (
    <>
      <section className='w-screen h-screen grid grid-rows-4 md:grid-cols-2'>
        <span className={`triangle z-100 top-60 ${selected === '/developer' ? 'md:block' : 'hidden'}`}></span>
        <span className={`triangle z-100 top-80 ${selected === '/mentor' ? 'md:block' : 'hidden'}`}></span>
        <span className={`triangle z-100 top-[25rem] ${selected === '/activist' ? 'md:block' : 'hidden'}`}></span>
        <div
          id='main-nav'
          className='w-full h-full md:h-screen row-span-1 centered flex-row md:flex-col sticky top-0 overflow-hidden bg-black text-white'
        >
          <NavLink
            id='developer'
            to='/developer'
            className={({ isActive }) => [
              isActive ? 'corrupted-file' : 'press-start-2p',
              'my-3'
            ].join(' ')}
          >
            DEVELOPER
          </NavLink>
          <NavLink
            id='mentor'
            to='/mentor'
            className={({ isActive }) => [
              isActive ? 'knewave-selected' : 'knewave',
              'my-3'
            ].join(' ')}
          >
            MENTOR
          </NavLink>
          <NavLink id='activist' to='/activist' className={({ isActive }) => [
            isActive ? 'rubik-glitch' : 'rubik',
            'my-3'
          ].join(' ')}>
            ACTIVIST
          </NavLink>
        </div>
        <div className='w-full h-full md:h-screen row-span-3 overflow-y-scroll p-20'>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default MainPage;
