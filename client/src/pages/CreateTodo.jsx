import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TodoForm from '../components/TodoForm';

export default function CreateTask() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const validateSession = async () => {
    try {
      await api.get("/api/auth/validate");
    } catch {
      setToken(null);
      window.location.href = "/login";
    }
  };

  validateSession();
}, []);
  const handleSubmit = async (todo) => {
    setLoading(true);
    try {
      await api.post('api/create/todo', todo);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Oh no, something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <TodoForm
      onSubmit={handleSubmit}
      loading={loading}
      errorMessage={errorMessage}
      buttonText="Create"
      title="Create your todo!"
    />
  );
}
