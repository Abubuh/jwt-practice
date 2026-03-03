import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoCard from '../components/TodoCard';
import useFetchTodos from '../hooks/useFetchTodos';
import DashboardMessage from '../components/DashboardMessage';
import TodoActions from '../components/TodoActions';
import DashboardTitle from '../components/DashboardTitle';
import DashboardNav from '../components/DashboardNav';
import DashboardNavContainer from '../components/DashboardNavContainer';
import TodosContainer from '../components/TodosContainer';
import { Reorder } from "framer-motion";
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const [errorDelete, setErrorDelete] = useState();
  const { todos, errorTodos, handleDelete, loading, handleReorder } =
    useFetchTodos();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-indigo-200 p-8">
      <div className="max-w-5xl mx-auto">
        <DashboardNavContainer>
          <DashboardTitle title="Your Tasks ✨" />
          <DashboardNav handleLogout={handleLogout} />
        </DashboardNavContainer>

        <TodosContainer>
          {loading && (
            <DashboardMessage textColor="text-gray-500" message="Loading" />
          )}
          {errorTodos && (
            <DashboardMessage
              message="Couldn't load todos! Try again later!"
              textColor="text-red-800"
            />
          )}
          {!errorTodos && !loading && todos.length === 0 ? (
            // <DashboardMessage
            //   message="
            // No tasks yet. Add your first one 👀"
            //   textColor="text-gray-500 text-center"
            // />
              <EmptyState />
          ) : (
            <div className="flex flex-col gap-6">
              <Reorder.Group axis="y" values={todos} onReorder={handleReorder}>
                {todos.map((todo) => (
                  <Reorder.Item className='flex gap-4 mb-4' key={todo._id} value={todo}>
                      <TodoCard todo={todo} />
                      <div className="flex gap-2 items-center">
                        <TodoActions handleDelete={handleDelete} todo={todo} />
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          )}
        </TodosContainer>
      </div>
    </div>
  );
};

export default Dashboard;
