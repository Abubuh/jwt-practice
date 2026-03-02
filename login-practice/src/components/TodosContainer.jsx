import React from 'react'

const TodosContainer = ({children}) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8">{children}</div>
  )
}

export default TodosContainer