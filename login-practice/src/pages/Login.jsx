import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import UserForm from '../components/UserForm';
import UserFormTitle from '../components/UserFormTitle';
import UserFormContainer from '../components/UserFormContainer';
import UserFormRouter from '../components/UserFormRouter';
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, []);

  const handleSubmit = async (form) => {
    setLoading(true);
    try {
      const result = await api.post('/login', form);
      localStorage.setItem('token', result.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Oh no, something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserFormContainer>
      <UserFormTitle title="Welcome Back 👋" />
      <UserForm
        buttonText="Login"
        onSubmit={handleSubmit}
        error={error}
        loading={loading}
      ></UserForm>
      <UserFormRouter
        action="Register"
        message="Don't have an account? "
        route="/register"
      />
    </UserFormContainer>
  );
};

export default Login;
