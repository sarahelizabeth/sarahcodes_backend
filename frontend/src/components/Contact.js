import React, { useState, useRef, useContext, useEffect } from 'react';
import { Button, ButtonToolbar, Form, Modal, Input } from 'rsuite';
import { UserContext } from '../App';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as='textarea' ref={ref} />);

const Contact = ({ isOpen, handleClose }) => {
  const userContext = useContext(UserContext);
  const form = useRef();
  const initialState = { 
    name: '', 
    email: '',
    body: '' 
  };
  const [formValue, setFormValue] = useState(initialState);

  useEffect(() => {
    if (userContext.user !== null) {
      setFormValue({ 
        name: userContext.user.first_name, 
        email: userContext.user.email, 
        body: ''
      });
    } else {
      setFormValue(initialState);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    console.log('contact submit: ', formValue);
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Contact Me!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid ref={form} onChange={setFormValue} formValue={formValue}>
          <Form.Group controlId='name'>
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name='name' />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name='email' />
          </Form.Group>

          <Form.Group controlId='body'>
            <Form.ControlLabel>Textarea</Form.ControlLabel>
            <Form.Control rows={5} name='body' accepter={Textarea} />
          </Form.Group>

          <ButtonToolbar>
            <Button onClick={handleSubmit} appearance='primary' type='submit'>
              Submit
            </Button>
          </ButtonToolbar>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Contact