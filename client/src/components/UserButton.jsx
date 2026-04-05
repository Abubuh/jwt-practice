import React from 'react'
import Spinner from './Spinner'

const UserButton = ({loading, buttonText}) => {
  return (
    <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center bg-blue-600  text-white py-2 rounded-lg font-semibold transition duration-200 ${loading ? 'opacity-80' : 'cursor-pointer hover:bg-blue-700'}`}
      >
        {loading && (
          <Spinner/>
        )}
        {buttonText}
      </button>
  )
}

export default UserButton