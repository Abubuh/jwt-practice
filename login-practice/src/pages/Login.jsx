import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
      })
      const [message, setMessage] = useState()
      const [error, setError] = useState()
      const handleChange = (e) => {
        const {name, value } = e.target
        setForm(prev => ({...prev, [name]: value}))
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        try{
          const result = await axios.post('http://localhost:3000/login', form)
          console.log(result)
          setMessage(result.data.message)
          console.log('Succeesss')
        }catch(error){
          setMessage(
            error.response?.data?.message || 'Oh no, algo salió mal'
          )
        }
        // console.log(form)
      }
    
      return (
        <>
          <h1>Hello</h1>
          <form onSubmit={handleSubmit} action="" className='flex flex-col w-fit gap-3'>
            <input type="text" className='border-2 border-black rounded-md' value={form.username} placeholder='Name'
            name='username'
            onChange={handleChange}/>
            <input type="text" className='border-2 border-black rounded-md' placeholder='Name'
            onChange={handleChange}
            name='password'/>
            <button className='border-2 rounded-md border-black self-center w-1/2' value={form.password}>Login</button>
          </form>
        </>
      )
}

export default Login