import React from 'react'

const CommentBlock = ({ showForm, isVisible }) => {
  return (
    <>
      {/* this works */}
      <AnimatePresence>
        {showWarning === index && (
          <motion.div
            layout
            animate={{ height: '100px' }}
            transition={{
              height: { ease: 'backIn' },
            }}
            exit={{ height: '0px' }}
          >
            <motion.p layout>Please log in to comment!</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showForm === index && (
          // replace with actual form
          <CommentForm questionId={question.pk} ref={containerRef} submitComment={() => handleSubmitComment(index)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default CommentBlock