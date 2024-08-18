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
    <div className='question-box'>
      <Input
        value={input}
        onChange={(value) => setInput(value)}
        as='textarea'
        rows={4}
        placeholder='Enter your question here...'
      />
      <Button onClick={handleSubmit} appearance='primary' type='submit'>
        Submit
      </Button>
    </div>
  );
};

export default QuestionForm;
