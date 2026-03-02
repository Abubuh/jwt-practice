import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TodoForm({
  initialData,
  onSubmit,
  loading,
  errorMessage,
  buttonText,
  title
}) {
  const [todo, setTodo] = useState({
    title: '',
    priority: 'Low',
  });

useEffect(() => {
  if (initialData?.title) {
    setTodo({
      title: initialData.title || "",
      priority: initialData.priority || "Low",
      completed: initialData.completed ?? false
    });
  }
}, [initialData?.title]);

  const handleValue = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(todo);
  };

  const priorityColors = {
    Low: 'text-green-600',
    Medium: 'text-yellow-600',
    High: 'text-red-600',
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              value={todo.title}
              name="title"
              onChange={handleValue}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={todo.priority}
              onChange={handleValue}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium ${priorityColors[todo.priority]}`}
            >
              <option value="Low">Low 🟢</option>
              <option value="Medium">Medium 🟡</option>
              <option value="High">High 🔴</option>
            </select>
          </div>

          {errorMessage && (
            <p className="text-red-400 text-center">{errorMessage}</p>
          )}

          <div className="flex justify-between pt-4">
            <Link
            to="/dashboard"
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-80"
            >
              {loading ? 'Loading...' : buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}