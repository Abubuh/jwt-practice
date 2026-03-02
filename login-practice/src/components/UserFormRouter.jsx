import React from 'react'
import { Link } from 'react-router-dom'

const UserFormRouter = ({route, message, action}) => {
  return (
    <p className="text-sm text-center text-gray-500 mt-6">
          {message} {' '}
          <Link
            to={route}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {action}
          </Link>
        </p>
  )
}

export default UserFormRouter