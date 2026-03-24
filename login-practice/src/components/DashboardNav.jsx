import React from 'react';
import { Link } from 'react-router-dom';

const DashboardNav = ({handleLogout}) => {
  return (
    <div className="flex gap-6">
      <Link
        to="/createTodo"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        + Add List
      </Link>
      <button
        onClick={handleLogout}
        className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        Log out
      </button>
    </div>
  );
};

export default DashboardNav;
