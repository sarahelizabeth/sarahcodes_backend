import React from 'react';
import { useState, useEffect } from 'react';
import API from '../../api';
import MentorList from './MentorList';

const Mentor = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get(`api/portfolio/projects/?project_type=mentor`).then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <>
      <div className='mb-6'>
        <h6 className='mb-2'>PERSONAL STATEMENT</h6>
        <p>This is my personal statement for the mentor page.</p>
      </div>
      <h6 className='mb-3'>EXPERIENCES</h6>
      <MentorList projects={projects} />
    </>
  );
};

export default Mentor;
