import React, { useEffect, useState } from 'react';
import TodoForm from '../components/TodoForm';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const EditTodo = () => {
    const [todoData, setTodoData] = useState({})
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const id = useParams().id
    useEffect(() => {
        const fetchTodo = async () => {
            try{
                const todo = await api.get(`api/user/todos/${id}`)
                setTodoData(todo.data.data)
            }catch(error){
                setError(error.response?.message?.data)
            }
        }
          fetchTodo()
    }, [])

    const handleEdit = async (todo) => {
        setLoading(true)
        try{
            await api.patch(`/api/user/todos/update/${id}`, todo)
            navigate("/dashboard")
        }catch(error){
            setError(error.response?.data?.message)
        }finally{
            setLoading(false)
        }
    }
    
  return (
      <TodoForm 
        initialData={todoData}
        onSubmit={handleEdit}
        loading={loading}
        errorMessage={error}
        buttonText="Edit"
        title="Edit your todo :d"
        />
  );
};

export default EditTodo;
