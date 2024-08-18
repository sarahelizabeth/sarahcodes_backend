import React from 'react';
import { useState } from 'react';
import { Modal, Button, Divider } from 'rsuite';

const ActivistList = ({ projects }) => {
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(null);
  const [overflow, setOverflow] = useState(true);

  return (
    <>
      {projects.map(({ image, title, description, tools }, index) => (
        <>
          <div key={index} className='flex mb-6'>
            <div
              className='w-32 h-32 imageContainer relative h-full'
              onMouseOver={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
            >
              <img className='w-32 h-32 object-contain' src={image} />
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
              <p>{title}</p>
              <p className='grow'>{description}</p>
              <div className='tag-container'>
                {tools.map((tool, index) => (
                  <span key={index} className='bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600'>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Modal overflow={overflow} open={open == index} onClose={() => setOpen(null)}>
            <Modal.Header>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={image} />
              <p>{description}</p>
              {tools.map((tool, index) => (
                <span key={index} className='bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600'>
                  {tool}
                </span>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpen(null)} appearance='primary'>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
          <Divider />
        </>
      ))}
    </>
  );
};

export default ActivistList;
