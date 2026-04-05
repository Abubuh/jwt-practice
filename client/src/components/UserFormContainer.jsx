import React from 'react';

const UserFormContainer = ({children}) => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8">  
      {children}
      </div>
    </div>
  );
};

export default UserFormContainer;