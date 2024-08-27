import React, { useState } from 'react';
import axios from 'axios';
import API from '../../api';
import { Button, Modal } from 'rsuite';

const ProjectModal = ({ project, isOpen, handleClose }) => {
  const [overflow, setOverflow] = useState(true);
  console.log(project.images.length)

  return (
    <Modal overflow={true} open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{project.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {project.images.length > 0 && (
          <>
            {project.images.map((i, index) => (
              <img key={index} src={API.defaults.baseURL + i.image} />
            ))}
          </>
        )}
        <img src={API.defaults.baseURL + project.image} />
        <p>{project.description}</p>
        {project.tools.map((tool, index) => (
          <span key={index} className='bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600'>
            {tool}
          </span>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} appearance='primary'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProjectModal