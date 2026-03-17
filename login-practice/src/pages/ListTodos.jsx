import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../routes/AuthContext';
import { getListById } from '../services/listService';
import { getTodos, deleteTodo, createTodo } from '../services/todoService';
import DashboardTitle from '../components/DashboardTitle';
import ListCard from '../components/ListCard';
import ContentContainer from '../components/ContentContainer';

const ListTodos = () => {
  const { listId } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [list, setList] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const myRole = useMemo(() => list?.role || 'viewer', [list]);

  const canCreateEditAssignReorder = ['owner', 'admin', 'editor'].includes(myRole);
  const canDeleteTodos = ['owner', 'admin'].includes(myRole);
  const canManageMembers = ['owner', 'admin', 'editor'].includes(myRole);
  const canDeleteList = myRole === 'owner';

  useEffect(() => {
    const fetchListAndTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const listRes = await getListById(listId);
        const todoRes = await getTodos(listId);
        setList(listRes.data.data);
        setTodos(todoRes.data.data);
      } catch (err) {
        if (err.isAuthError || err.response?.status === 401) {
          logout();
          return;
        }
        setError(err.response?.data?.message || 'Could not load list');
      } finally {
        setLoading(false);
      }
    };

    fetchListAndTodos();
  }, [listId, logout]);

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(listId, todoId);
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    } catch (err) {
      console.error(err);
      setError('Failed to delete todo');
    }
  };

  const handleCreatePlaceholderTodo = async () => {
    try {
      const newTodo = await createTodo(listId, {
        title: 'New Todo',
        priority: 'low',
        description: 'Placeholder',
      });
      setTodos((prev) => [...prev, newTodo.data?.data || newTodo]);
    } catch (err) {
      console.error(err);
      setError('Failed to create todo');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-200 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <DashboardTitle title={list?.title || 'Untitled'} />

            <div className="flex items-center gap-2">
              {canCreateEditAssignReorder && (
                <>
                  <button
                    onClick={() => navigate(-1)}
                    className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCreatePlaceholderTodo}
                    className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Create Todo
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="rounded border border-red-300 bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          </div>
          <ContentContainer>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Todos</h2>

            {todos.length === 0 ? (
              <p className="mt-3 text-gray-600">No todos yet</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {todos.map((todo) => (
                  <li key={todo.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{todo.title}</h3>
                        <p className="text-sm text-gray-500">
                          {todo.description || 'No description'}
                        </p>
                        <p className="text-xs text-gray-400">Priority: {todo.priority}</p>
                      </div>
                      <div className="flex gap-2">
                        {canCreateEditAssignReorder && (
                          <button
                            onClick={() => navigate(`/editTodo/${todo.id}`)}
                            className="rounded bg-yellow-500 px-2 py-1 text-xs text-white"
                          >
                            Edit
                          </button>
                        )}
                        {canDeleteTodos && (
                          <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="rounded bg-red-500 px-2 py-1 text-xs text-white"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
                </ContentContainer>
        </div>

        <aside className="self-start rounded-xl bg-white p-4 shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Members</h3>
            <button
              className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
              onClick={() => alert('Invite user (pending)')}
            >
              Invite
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {list?.members?.map((member) => (
              <div
                key={member.user_id}
                className="flex items-center justify-between rounded border border-gray-200 bg-gray-50 p-2"
              >
                <div>
                  <div className="text-sm font-medium text-gray-700">{member.username}</div>
                  <div className="text-xs text-gray-500">{member.role}</div>
                </div>
                {canManageMembers && member.user_id !== list?.created_by && (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const menu = e.currentTarget.nextSibling;
                        if (menu) menu.classList.toggle('hidden');
                      }}
                      className="rounded px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-100"
                    >
                      ⋮
                    </button>
                    <div className="hidden absolute right-0 mt-1 w-32 rounded border border-gray-200 bg-white shadow-lg z-10">
                      <button
                        onClick={() => alert('Change role (pending)')}
                        className="block w-full text-left px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Change role
                      </button>
                      <button
                        onClick={() => alert('Remove user (pending)')}
                        className="block w-full text-left px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Your role: <span className="font-semibold">{myRole}</span>
          </div>

          {canDeleteList && (
            <button
              className="mt-4 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => alert('Delete list (pending)')}
            >
              Delete list
            </button>
          )}

          {['owner', 'admin'].includes(myRole) && (
            <button
              className="mt-2 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => alert('Edit list (pending)')}
            >
              Edit list
            </button>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ListTodos;
