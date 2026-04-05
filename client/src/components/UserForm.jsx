import React, { useEffect, useState } from 'react';
import UserInput from './UserInput';
import UserButton from './UserButton';
import ErrorMessage from './ErrorMessage';

const UserForm = ({ buttonText, onSubmit, error, loading }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    onSubmit(form);
  };
  return (
    <form onSubmit={handleSubmitUser} className="space-y-5">
      <UserInput
      label="Username"
      name="username"
      onChange={handleChange}
      placeholder="YourUsername"
      type="text"
      value={form.username}
      />
      <UserInput
      label="Password"
      name="password"
      onChange={handleChange}
      placeholder="••••••••"
      type="password"
      value={form.password}/>

      <ErrorMessage
      error={error}/>
      <UserButton
      buttonText={buttonText}
      loading={loading}/>
    </form>
  );
};

export default UserForm;
