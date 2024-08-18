import React from 'react';
import { useState, useRef } from 'react';
import { Button, ButtonToolbar, Modal, Form, Schema } from 'rsuite';
import Cookies from 'js-cookie';
import API from '../../api';
// import { login } from './apiCalls';

const Login = ({ isOpen, handleClose }) => {
  const form = useRef();
  const [formValue, setFormValue] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    email: StringType().isRequired('Email is required.').isEmail('Please enter a valid email address.'),
    password: StringType().isRequired('Password is required.'),
  });

  const handleSubmit = async () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }

    const user = {
      username: formValue.email,
      password: formValue.password,
    };

    API.post(`api/auth/login/`, user)
      .then((res) => {
        console.log(res.data);
        const oneHour = 1 / 24;
        Cookies.set('token', res.data.access, { expires: 7 });
        Cookies.set('refresh_token', res.data.refresh, { expires: oneHour });
        localStorage.setItem('user', JSON.stringify(res.data.user));
        handleClose();
      })
      .catch((error) => {
        console.error('login error: ', error);
      });
  };

  return (
    <Modal fluid='true' size='sm' open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={form} model={model} onChange={setFormValue} formValue={formValue}>
          <Form.Group controlId='email'>
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name='email' />
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control name='password' type='password' autoComplete='off' />
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
};

export default Login;
