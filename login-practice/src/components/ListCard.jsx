import { useState } from 'react';
import ListOptionsModal from './modal/ListOptionsModal';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
};

const ListCard = ({
  title,
  role,
  createdAt,
  members = [],
  onClick,
  list,
  onDelete,
  onUpdate,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const showMembers = members.length > 1;
  const displayMembers = members.slice(0, 3);
  const extraCount = members.length - displayMembers.length;

  return (
    <>
      <div
        onClick={onClick}
        className="w-full text-left rounded-xl flex flex-col justify-between bg-white p-4 shadow transition hover:shadow-md"
      >
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold text-gray-800  truncate">
              {title}
            </h3>
            {showMembers && role && (
              <span className="rounded px-2 py-1 text-xs bg-emerald-100 text-emerald-700">
                {role}
              </span>
            )}
          </div>
          {
            ["owner","admin","editor"].includes(role) && (
              <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOptionsOpen(true);
              }}
              className="rounded px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-100"
              >
            ⋮
          </button>
            )
          }
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
          <div className="text-right text-xs text-gray-400">
            <p>Creada: {formatDate(createdAt)}</p>
          </div>
        </div>
      </div>
      <ListOptionsModal
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        list={list}
        onDelete={onDelete}
        onUpdate={onUpdate}
        role={role}
      />
    </>
  );
};

export default ListCard;
