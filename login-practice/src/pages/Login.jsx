import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import UserForm from '../components/UserForm';
import UserFormTitle from '../components/UserFormTitle';
import UserFormContainer from '../components/UserFormContainer';
import UserFormRouter from '../components/UserFormRouter';
import { useAuth } from '../routes/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const {token, setToken} = useAuth()
  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token]);
  
  const handleSubmit = async (form) => {
    setLoading(true);
    try {
      const res = await api.post('/login', form);
      const token = res.data.token
      setToken(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
