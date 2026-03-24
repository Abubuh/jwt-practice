import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import UserFormTitle from '../components/UserFormTitle';
import UserFormContainer from '../components/UserFormContainer';
import UserFormRouter from '../components/UserFormRouter';
import { useAuth } from '../routes/AuthContext';
import { registerUser } from '@/services/authService';
const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuth()
 
  const handleSubmit = async (form) => {
    setError('');
    setLoading(true);
    try {
      const result = await registerUser(form);
      const token = result.data.token
      setToken(token)
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <UserFormContainer>
      <UserFormTitle title="Register 👋" />
      <UserForm
        buttonText="Register"
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
      />
      <UserFormRouter
        action="Login"
        message="Already have an account?"
        route="/login"
      />
    </UserFormContainer>
  );
};

export default Register;
