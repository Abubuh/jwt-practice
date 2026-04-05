import React from 'react';

const UserInput = ({label, type, name, value, onChange, placeholder}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder={placeholder}
      />
    </div>
  );
};

export default UserInput;
