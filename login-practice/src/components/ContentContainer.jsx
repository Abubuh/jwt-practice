import React from 'react'

const ContentContainer = ({children}) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8">{children}</div>
  )
}

export default ContentContainer