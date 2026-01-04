import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState()
  const [error, setError] = useState()
  const handleChange = (e) => {
    const {name, value} = e.target
    setForm(prev => ({...prev, [name]: value}))
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const result = await axios.post('http://localhost:3000/register', form)
      setError('')
      if(result) setMessage('User created!')
      //redirigir a una pagina home
    }catch(error){
      setError(error.response?.data)
    }
  };
  return (
    <div className='flex justify-center h-screen items-center '>
      <form action="" onSubmit={handleSubmit} className='flex flex-col gap-2 border-2 border-black p-6 rounded-md'>
        <input type="text" name='username' className='border-2 w-fit rounded-md border-black px-2 py-1' placeholder='Username'  onChange={handleChange} value={form.username}/>
        <input name='password' className='border-2 rounded-md w-fit border-black px-2 py-1' placeholder='Password' type='password' onChange={handleChange} value={form.password}/>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        <button className='border-black border-2 rounded-md py-1 w-1/2 self-center'>Register</button>
      </form>
    </div>
  );
};

export default Register;
