import { useState, useEffect } from 'react';
import { Button } from 'rsuite';
import API from '../api';
import Register from '../components/auth/Register';
import QuestionForm from '../components/blog/QuestionForm';
import Questions from '../components/Questions';
import TestContent from '../components/TestContent';
import Login from '../components/auth/Login';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AMAPage = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const closeModal = () => {
    setOpenLogin(false);
    setOpenRegister(false);
    // const cookies = Cookies.get();
    // console.log(cookies);
    // const currentToken = jwtDecode(cookies.token);
    // console.log(currentToken);
    // API.get(`/api/auth/user/`, {
    //   'headers': { 'Authorization': `Bearer ${cookies.token}`}
    // }).then((response) => {
    //   const user = response.data;
    //   console.log(user);
    // })
  };

  const submitModal = (response) => {
    console.log(response);
  };

  const handleSuccess = () => {
    console.log('question asked');
    setSubmitted(true);
  };

  useEffect(() => {
    API.get(`/api/blog/questions/`)
      .then((response) => {
        const questionData = response.data;
        console.log(questionData);
        setQuestions(questionData);
      })
      .catch((error) => {
        console.error('list questions error: ', error);
      });
  }, [submitted]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, [setOpenLogin, setOpenRegister]);

  return (
    <>
      <section className='w-screen h-screen grid grid-rows-4 md:grid-cols-2'>
        <div className='w-full h-full md:h-screen row-span-1 centered flex-row md:flex-col sticky top-0 overflow-hidden bg-black text-white'>
          <p>ask me anything</p>
          {user == null ? (
            <>
              <Button size='sm' variant='primary' onClick={() => setOpenRegister(true)}>
                Sign Up
              </Button>
              <Button size='sm' variant='primary' onClick={() => setOpenLogin(true)}>
                Log In
              </Button>
            </>
          ) : (
            <QuestionForm user={user} submitQuestion={handleSuccess} />
          )}
        </div>
        <div className='w-full h-full md:h-screen row-span-3 overflow-y-scroll p-20'>
          <Questions questions={questions} />
        </div>
      </section>
      <Register isOpen={openRegister} handleClose={closeModal} handleSuccess={closeModal} />
      <Login isOpen={openLogin} handleClose={closeModal} />
    </>
  );
};

export default AMAPage;
