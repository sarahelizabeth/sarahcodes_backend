import { useState } from 'react';
import Developer from '../components/main/Developer';
import Mentor from '../components/main/Mentor';
import Activist from '../components/main/Activist';
import Intro from '../components/main/Intro';

const MainPage = () => {
  const [selected, setSelected] = useState('home');
  const [hoverDev, setHoverDev] = useState(false);
  const [hoverMen, setHoverMen] = useState(false);
  const [hoverAct, setHoverAct] = useState(false);

  return (
    <>
      <section className='w-screen h-screen grid grid-rows-4 md:grid-cols-2'>
        <span className={`triangle z-100 top-60 ${selected === 'developer' ? 'md:block' : 'hidden'}`}></span>
        <span className={`triangle z-100 top-80 ${selected === 'mentor' ? 'md:block' : 'hidden'}`}></span>
        <span className={`triangle z-100 top-[25rem] ${selected === 'activist' ? 'md:block' : 'hidden'}`}></span>
        <div className='w-full h-full md:h-screen row-span-1 centered flex-row md:flex-col sticky top-0 overflow-hidden bg-black text-white'>
          <button
            onClick={() => setSelected('developer')}
            className={`my-3 ${selected === 'developer' ? 'corrupted-file' : 'press-start-2p'} ${
              hoverDev ? 'corrupted-file' : ''
            }`}
            onMouseEnter={() => setHoverDev(true)}
            onMouseLeave={() => setHoverDev(false)}
          >
            DEVELOPER
          </button>
          <button
            onClick={() => setSelected('mentor')}
            className={`my-3 ${selected === 'mentor' ? 'knewave-selected' : 'knewave'} ${
              hoverMen ? 'knewave-selected' : ''
            }`}
            onMouseEnter={() => setHoverMen(true)}
            onMouseLeave={() => setHoverMen(false)}
          >
            MENTOR
          </button>
          <button
            onClick={() => setSelected('activist')}
            className={`my-3 ${selected === 'activist' ? 'rubik-glitch' : 'rubik'} ${hoverAct ? 'rubik-glitch' : ''}`}
            onMouseEnter={() => setHoverAct(true)}
            onMouseLeave={() => setHoverAct(false)}
          >
            ACTIVIST
          </button>
        </div>
        <div className='w-full h-full md:h-screen row-span-3 overflow-y-scroll p-20'>
          {(() => {
            switch (selected) {
              case 'developer':
                return <Developer />;
              case 'mentor':
                return <Mentor />;
              case 'activist':
                return <Activist />;
              default:
                return <Intro />;
            }
          })()}
        </div>
      </section>
    </>
  );
};

export default MainPage;
