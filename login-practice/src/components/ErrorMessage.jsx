import React from 'react'

const ErrorMessage = ({error}) => {
  return (
    <>
          {error && <p className="text-center text-red-500">{error}</p>}
    </>
  )
}

export default ErrorMessage