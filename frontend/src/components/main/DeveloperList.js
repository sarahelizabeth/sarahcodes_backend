import React, { useState } from 'react';
import { Button, Divider } from 'rsuite';
import ProjectModal from './ProjectModal';

const DeveloperList = ({ projects }) => {
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(null);

  return (
    <>
      {projects.map((project, index) => (
        <div key={index}>
          <div className='flex mb-6'>
            <div
              className='w-32 h-32 imageContainer relative h-full'
              onMouseOver={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
            >
              <img className='w-32 h-32 object-cover' src={project.logo} />
              {hover == index && (
                <div className='bg-gray-100 absolute top-0 left-0 w-full h-full'>
                  <Button
                    size='sm'
                    style={{
                      position: 'relative',
                      top: '45px',
                      left: '15px',
                    }}
                    variant='primary'
                    onClick={() => setOpen(index)}
                  >
                    View More
                  </Button>
                </div>
              )}
            </div>
            <div className='pl-5 flex flex-col h-32'>
              <p>{project.title}</p>
              <p className='grow'>{project.description}</p>
              <div className='tag-container'>
                {project.tools.map((tool, index) => (
                  <span key={index} className='bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600'>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ProjectModal project={project} isOpen={open === index} handleClose={() => setOpen(null)} />
          <Divider />
        </div>
      ))}
    </>
  );
};

export default DeveloperList;
