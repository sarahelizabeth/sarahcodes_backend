import React from 'react';
import { useState } from 'react';
import { Button, Input } from 'rsuite';
import API from '../../api';

const QuestionForm = ({ user, submitQuestion }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input == '') {
      console.error('Input error');
      return;
    }

    const questionValue = {
      body: input,
      author: user.pk,
    };

    API.post(`api/blog/questions/`, questionValue)
      .then((res) => {
        console.log(res.data);
        setInput('');
        submitQuestion();
      })
      .catch((error) => {
        console.error('question error: ', error);
      });
  };

  return (
    <div className='question-box px-8 grid place-items-center'>
      <Input
        value={input}
        onChange={(value) => setInput(value)}
        as='textarea'
        rows={4}
        placeholder='Enter your question here...'
      />
      <button className='button-shadow-white border-2 border-white px-4 py-2 uppercase mt-6' onClick={handleSubmit} type='submit'>
        Submit
      </button>
    </div>
  );
};

export default QuestionForm;
