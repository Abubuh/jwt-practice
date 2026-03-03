import React, { useEffect, useState } from 'react';
import api from '../services/api';

const useFetchTodos = () => {
  const [todos, setTodos] = useState([]);
  const [errorTodos, setErrorTodos] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
        setLoading(true)
      try {
        const result = await api.get('/api/user/todos');
        setTodos(result.data.data);
      } catch (error) {
        setErrorTodos(error);
      }finally{
        setLoading(false)
      }
    };
    fetchTodos();
  }, []);

  const handleReorder = async (newTodos) => {
  // 1️⃣ Actualización optimista
  console.log(newTodos)
  setTodos(newTodos);
  try {
    await api.patch("/api/user/todos/reorder", {
      todos: newTodos.map((todo, index) => ({
        id: todo._id,
        order: index,
      })),
    });
  } catch (error) {
    console.error(error);
    // aquí podrías volver al estado anterior si falla
  }
};

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`api/user/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error.response?.message?.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    todos,
    errorTodos,
    loading,
    handleDelete,
    handleReorder
  };
};
export default useFetchTodos;
