import React from 'react';
import { useState, useEffect } from 'react';
import { Button, ButtonToolbar, Modal } from 'rsuite';
import API from '../api';

const Questions = ({ questions }) => {
  const reverse = questions.toReversed();
  console.log(questions);
  console.log(reverse);
  return (
    <div>
      {questions.toReversed().map((question, index) => (
        <div key={index} className='py-5'>
          <p>FROM</p>
          <p>{question.body}</p>
          <Button>Comment</Button>
        </div>
      ))}
    </div>
  );
};

export default Questions;
