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
import { Reorder, motion } from "framer-motion";
import EmptyState from '../components/EmptyState';
import TodoSkeleton from '../components/TodoSkeleton';

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
          {loading ? (
            <TodoSkeleton/>
          ) :
          errorTodos ? (
            <DashboardMessage
              message="Couldn't load todos! Try again later!"
              textColor="text-red-800"
            />
          ) : 
           todos.length === 0 ? (
              <EmptyState />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
>
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
            </motion.div>
          )}
        </TodosContainer>
      </div>
    </div>
  );
};

export default Dashboard;
