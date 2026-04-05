import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/" state={{ message: 'No estas loggeado' }} />;
  }
  return children;
};

export default ProtectedRoute;