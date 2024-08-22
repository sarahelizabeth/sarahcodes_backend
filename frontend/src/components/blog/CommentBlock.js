import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from 'rsuite';

const CommentBlock = ({ isVisible, questionId, submitComment }) => {
  const [input, setInput] = useState('');
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          animate={{ height: '110px' }}
          transition={{
            delayChildren: 0.5,
            height: { ease: 'easeOut', duration: 1 },
          }}
          exit={{ height: '0px' }}
        >
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.4,
            }}
            className='comment-form mt-4 flex flex-col w-full'
          >
            <Input
              value={input}
              onChange={(value) => setInput(value)}
              as='textarea'
              rows={2}
              placeholder='Enter your comment here...'
              className='self-stretch'
            />
            <button
              className='button-shadow-black hover:font-bold border-2 border-black px-4 py-2 uppercase mt-2 place-self-end'
              onClick={submitComment}
              type='submit'
            >
              Submit
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommentBlock