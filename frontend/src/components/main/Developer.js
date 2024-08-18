import React from 'react';
import { useState, useEffect } from 'react';
import DeveloperList from './DeveloperList';
import API from '../../api';

import { FaAws, FaDocker, FaGithub, FaHtml5, FaNode, FaPython, FaReact, FaSass, FaVuejs } from 'react-icons/fa';
import { SiDjango, SiTailwindcss, SiNextdotjs, SiTypescript } from 'react-icons/si';
import { DiMongodb, DiPostgresql } from 'react-icons/di';

const Developer = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get(`api/projects/?project_type=developer`).then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <>
      <div className='mb-6'>
        <h6 className='mb-2'>PERSONAL STATEMENT</h6>
        <p>This is my personal statement for the developer page.</p>
      </div>
      <div className='mb-6'>
        <h6 className='mb-3'>STACK</h6>
        <div className='grid grid-cols-5 w-full gap-2'>
          <FaReact size={35} />
          <FaVuejs size={35} />
          <SiDjango size={35} />
          <DiPostgresql size={35} />
          <SiTypescript size={32} />
          <FaPython size={35} />
          <FaHtml5 size={35} />
          <FaSass size={35} />
          <SiTailwindcss size={35} />
          <FaAws size={38} />
          <FaDocker size={35} />
          <FaGithub size={35} />
          <SiNextdotjs size={35} />
          <FaNode size={35} />
          <DiMongodb size={35} />
        </div>
      </div>
      <h6 className='mb-3'>PROJECTS</h6>
      <DeveloperList projects={projects} />
    </>
  );
};

export default Developer;
