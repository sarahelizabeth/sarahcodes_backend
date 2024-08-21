import React, { useContext, useState, useRef } from 'react';
import { Button, ButtonToolbar, Modal, Form, Schema } from 'rsuite';
import API from '../../api';
import Cookies from 'js-cookie';
import { UserContext } from '../../App';

const Register = ({ isOpen, handleClose }) => {
  const form = useRef();
  const userContext = useContext(UserContext);
  const [formValue, setFormValue] = useState({
    first_name: '',
    email: '',
    password1: '',
    password2: '',
  });

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    first_name: StringType().isRequired('First name is required.'),
    email: StringType().isRequired('Email is required.').isEmail('Please enter a valid email address.'),
    password1: StringType()
      .proxy(['password2'])
      .minLength(6, 'Must contain at least 6 characters.')
      .containsLetter('Must contain at least one letter.')
      .containsNumber('Must contain at least one number.')
      .containsUppercaseLetter('Must contain at least one uppercase letter.')
      .containsLowercaseLetter('Must contain at least one lowercase letter.'),
    password2: StringType().equalTo('password1'),
  });

  const setCookies = (response) => {
    console.log(response);
    const oneHour = 1 / 24;
    Cookies.set('access_token', response.access, { expires: 7 });
    Cookies.set('refresh_token', response.refresh, { expires: oneHour });
    localStorage.setItem('user', JSON.stringify(response.user));
  };

  const handleSubmit = () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }

    API.post(`api/auth/register/`, formValue)
      .then((res) => {
        console.log(res.data);
        const response = res.data;
        return response.user;
      })
      .then((res) => {
        console.log(res);
        const user = {
          email: res.email,
          password: formValue.password1,
        };
        // abstract away this function and fucking figure out
        // how to do fucking promise calls!!!!!!
        API.post(`api/auth/login/`, user)
          .then((res) => {
            console.log(res.data);
            setCookies(res.data);
            userContext.setUser(res.data);
            handleClose();
          })
          .catch((error) => {
            console.error('login error: ', error);
            return error;
          });
      })
      .catch((error) => {
        console.error('register error: ', error);
      });
  };

  return (
    <Modal size='sm' open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          I will never send you any annoying emails (except for an email update when I've answered your question) and your data will
          never be used for any reason (except for stalking purposes).
        </p>
        <Form fluid ref={form} model={model} onChange={setFormValue} formValue={formValue}>
          <Form.Group controlId='first-name'>
            <Form.ControlLabel>First Name</Form.ControlLabel>
            <Form.Control name='first_name' />
            <Form.HelpText>This field is required</Form.HelpText>
          </Form.Group>

          <Form.Group controlId='last-name'>
            <Form.ControlLabel>Last Name</Form.ControlLabel>
            <Form.Control name='last_name' />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name='email' />
            <Form.HelpText>This field is required</Form.HelpText>
          </Form.Group>

          <Form.Group controlId='password1'>
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control name='password1' type='password' autoComplete='off' />
          </Form.Group>

          <Form.Group controlId='password2'>
            <Form.ControlLabel>Confirm Password</Form.ControlLabel>
            <Form.Control name='password2' type='password' autoComplete='off' />
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

export default Register;
