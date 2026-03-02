import { useState } from "react";
import api from "../services/api";

export default function TodoCard({todo
}) {
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(todo.completed)
  const priorityColors = {
    "low": "bg-green-100 text-green-600",
    "medium": "bg-yellow-100 text-yellow-600",
    "high": "bg-red-100 text-red-600",
  };
  
    const handleTodoCompleted = async () => {
      setLoading(true)
      try{
        await api.patch(`api/user/todos/update/${todo._id}`, {"completed" : !completed})
        setCompleted(prev => !prev)
      }catch(error){
        alert("Couldn't make the change, try  later!")
      }finally{
        setLoading(false)
      }
    }
  return (
    <div
      className={`min-w-110
        bg-white/80 backdrop-blur-md 
        rounded-2xl shadow-xl 
        p-6 transition-all duration-300
        ${todo.variant === "hero" ? "w-100 scale-110" : "w-full"}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className={`font-semibold text-lg ${completed && "line-through opacity-50"}`}>
          {todo.title}
        </h3>
        <span
          className={`px-3 py-1 text-xs rounded-full ${priorityColors[todo.priority.toLowerCase()]}`}
        >
          {todo.priority}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <input 
          type="checkbox"
          checked={completed}
          onChange={handleTodoCompleted}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center
            ${completed ? "bg-blue-500 border-blue-500" : "border-gray-300"}
          `}
        >
        </input>
          {completed && <span className="text-white text-xs">✓</span>}
        <span className="text-sm text-gray-400">
          {completed ? "Completed" : "Pending"}
        </span>
      </div>
    </div>
  );
}