import React, { useState } from 'react'
import { Button, Modal } from 'rsuite';

const ProjectModal = ({ project, isOpen, handleClose }) => {
  const [overflow, setOverflow] = useState(true);

  return (
    <Modal overflow={true} open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{project.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={project.image} />
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