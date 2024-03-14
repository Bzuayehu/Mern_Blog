import React from 'react'

const CommentsList = ({comments}) => {
  return (
    <>
        <h3 className='sm:text-2x1 text-x1 font-bold my-6 text-gray-900'>
            Comments:
        </h3>
        {comments.map((comment, index) => (
                <div key={index}>
                    <h4 className='text-x1 font-bold'>{comment.username}</h4>
                    <p className='mt-1 mb-4'>{comment.text}</p>
                </div>
            ))}
    </>
  )
}

export default CommentsList