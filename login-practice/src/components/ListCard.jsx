import React from 'react';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
};

const ListCard = ({
  title,
  description,
  role,
  createdAt,
  members = [],
  onClick,
}) => {
  const showMembers = members && members.length > 1;
  const displayMembers = (members || []).slice(0, 3);
  const extraCount = (members?.length || 0) - displayMembers.length;

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl bg-white p-4 shadow transition hover:shadow-md"
      type="button"
    >
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className="text-right text-xs text-gray-400">
          <p>Creada: {formatDate(createdAt)}</p>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center">
        {showMembers ? (
          <div className="flex items-center gap-2 overflow-hidden">
            {displayMembers.map((member) => (
              <span
                key={member.user_id}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700"
              >
                {member.username}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                +{extraCount}
              </span>
            )}
          </div>
        ) : (
          <span className="text-xs text-gray-400">Solo tú</span>
        )}

        {showMembers && role && (
          <span className="rounded px-2 py-1 text-xs bg-emerald-100 text-emerald-700">
            {role}
          </span>
        )}
      </div>
    </button>
  );
};

export default ListCard;
