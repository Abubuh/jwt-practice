import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import UserFormTitle from '../components/UserFormTitle';
import UserFormContainer from '../components/UserFormContainer';
import UserFormRouter from '../components/UserFormRouter';
import { useAuth } from '../routes/AuthContext';
import { loginUser } from '@/services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { setToken} = useAuth()
  
  const handleSubmit = async (form) => {
    setError('')
    setLoading(true);
    try {
      const res = await loginUser(form);
      const token = res.token
      setToken(token);
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
