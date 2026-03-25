import React from 'react'

const ErrorMessage = ({ type = "error", onRetry }) => {
   const config = {
    error: {
      title: "Couldn't load data",
      message: "Something went wrong. Please try again later.",
      iconBg: "bg-red-50",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 5v3M8 10.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Z"
            stroke="#A32D2D" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  };

  const { title, message, iconBg, icon } = config[type];

  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-100">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="mb-1 text-sm font-medium text-gray-900">{title}</p>
        <p className="mb-4 text-xs text-gray-500 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage