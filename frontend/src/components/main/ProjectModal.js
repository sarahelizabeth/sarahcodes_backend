import React, { useState } from 'react';
import axios from 'axios';
import API from '../../api';
import { Button, Modal } from 'rsuite';
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia';


const ProjectModal = ({ project, isOpen, handleClose }) => {
  const [overflow, setOverflow] = useState(true);
  console.log(project.images)

  return (
    <Modal overflow={true} open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <h3 className='rubik font-semibold'>{project.title}</h3>
      </Modal.Header>
      <Modal.Body>
        <div className='flex gap-2 w-full'>
          {project.images?.map((i, index) => (
            <div className='img-container max-w-40'>
              <img key={index} id={index} src={API.defaults.baseURL + i.image} />
            </div>
          ))}
        </div>
        <p className='py-3'>{project.description}</p>
        {project.tools?.map((tool, index) => (
          <span key={index} className='bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600'>
            {tool}
          </span>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button href={project.link} appearance='primary' startIcon={<LiaExternalLinkSquareAltSolid />}>
          View
        </Button>
        <Button onClick={handleClose} appearance='ghost' color='red'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProjectModal