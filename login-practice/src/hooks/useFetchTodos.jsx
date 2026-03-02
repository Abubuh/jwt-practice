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
  };
};
export default useFetchTodos;
