import React from 'react';
import { Link } from 'react-router-dom';

const TodoActions = ({todo, handleDelete}) => {
  return (
    <>
      <Link
        to={`/edittodo/${todo._id}`}
        className="px-3 py-1 bg-blue-500 text-white rounded-md max-h-8 hover:bg-blue-600 hover:scale-105 transition-all duration-300"
      >
        Edit
      </Link>

      <button
        onClick={() => handleDelete(todo._id)}
        className="px-3 py-1 bg-red-500 text-white max-h-8 rounded-md hover:bg-red-600 hover:scale-105 transition-all duration-300"
      >
        Delete
      </button>
    </>
  );
};

export default TodoActions;
