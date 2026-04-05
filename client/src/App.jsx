import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import CreateTodo from './pages/CreateTodo';
import EditTodo from './pages/EditTodo';
import ListTodos from './pages/ListTodos';
function App() {
  return (
    <div className='bg-linear-to-br min-h-screen h-full from-blue-200 to-purple-200'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lists/:listId/todos"
          element={
            <ProtectedRoute>
              <ListTodos />
            </ProtectedRoute>
          }
        />
        <Route
        path="/createTodo"
        element={
          <ProtectedRoute>
            <CreateTodo/>
          </ProtectedRoute>
        }
        />
        <Route
        path="/editTodo/:id"
        element={
          <ProtectedRoute>
            <EditTodo/>
          </ProtectedRoute>
        }
        />
      </Routes>
      
    </div>
  );
}

export default App;
