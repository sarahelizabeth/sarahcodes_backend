import React from 'react';
import { useState, useEffect } from 'react';
import API from '../../api';
import ActivistList from './ActivistList';

const Activist = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get(`api/projects/?project_type=activist`).then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <>
      <div className='mb-6'>
        <h6 className='mb-2'>PERSONAL STATEMENT</h6>
        <p>This is my personal statement for the developer page.</p>
      </div>
      <h6 className='mb-3'>PROJECTS</h6>
      <ActivistList projects={projects} />
    </>
  );
};

export default Activist;
