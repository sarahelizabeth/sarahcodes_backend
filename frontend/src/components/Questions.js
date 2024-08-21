import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Divider } from 'rsuite';
import API from '../api';
import QuestionItem from './blog/QuestionItem';
import AnswerItem from './blog/AnswerItem';

const Questions = ({ questions }) => {
  return (
    <div className='mt-5'>
      {questions.toReversed().map((question, index) => (
        <div key={index} className='item'>
          <QuestionItem question={question} />
          {question.answer !== null && <AnswerItem answer={question.answer} />}
          <Button>Comment</Button>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default Questions;
