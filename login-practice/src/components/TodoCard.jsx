import { useState } from 'react';
import TodoOptionsModal from './modal/TodoOptionsModal';

  const priorityColors = {
    low: 'bg-green-100 text-green-600',
    medium: 'bg-yellow-100 text-yellow-600',
    high: 'bg-red-100 text-red-600',
  };

export default function TodoCard({
  todo,
  canCreateEditAssignReorder,
  canDeleteTodos,
  deleteTodo,
  onToggleCompleted,
  onPatch,
  members = [],
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const assignedMember = members.find((m) => m.user_id === todo.assigned_to);

  return (
    <>
      <div
        className={`
        bg-white
        rounded-2xl shadow-md
        p-6 transition-all duration-300
        ${todo.variant === 'hero' ? 'w-100 scale-110' : 'w-full'}
      `}
      >
        <div className="flex justify-between gap-3">
          <div className="flex flex-col">
            <h3
              className={`font-semibold text-xl ${todo.completed && 'line-through opacity-50'}`}
            >
              {todo.title}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              {todo.description || 'No description'}
            </p>
            <div className='flex gap-3'>
              <span
                className={`px-3 py-1 text-xs rounded-full w-fit ${priorityColors[todo.priority.toLowerCase()]}`}
              >
                {todo.priority}
              </span>
              {assignedMember ? (
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    Assigned to: {assignedMember.username}
                  </span>
              ) : (
                <span className="text-xs text-gray-400 flex items-center gap-1">Unassigned</span>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2 justify-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleCompleted(todo.id, todo.completed)}
                 disabled={!canCreateEditAssignReorder}
                className="w-5 h-5 cursor-pointer"></input>
              <span className="text-sm text-gray-400">
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
            <div className="flex justify-end">
              {canCreateEditAssignReorder && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-black border border-gray-700 hover:bg-gray-200 cursor-pointer rounded px-2 py-1 text-xs font-medium transition"
                >
                  ⚙️Settings
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <TodoOptionsModal
        key={todo.id + JSON.stringify(todo)}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        todo={todo}
        onDelete={deleteTodo}
        onPatch={onPatch}
        members={members}
        canDeleteTodos={canDeleteTodos}
      />
    </>
  );
}
