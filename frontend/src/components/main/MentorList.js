import React from 'react';
import { useState } from 'react';
import { Modal, Button, Divider } from 'rsuite';

const MentorList = ({ projects }) => {
  return (
    <>
      {projects.map((project, index) => (
        <>
          <div key={index} className='flex mb-6'>
            <img className='w-32 h-32' src={project.image} />
            <div className='pl-5 flex flex-col h-32'>
              <p>{project.title}</p>
              <p className='grow'>{project.description}</p>
            </div>
          </div>
          <Divider />
        </>
      ))}
    </>
  );
};

export default MentorList;
