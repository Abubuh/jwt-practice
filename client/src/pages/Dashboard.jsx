import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardMessage from '../components/DashboardMessage';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../routes/AuthContext';
import useFetchLists from '../hooks/useFetchLists';
import ListCard from '../components/ListCard';
import Navbar from '../components/Navbar';
import ListsSkeleton from '../components/ListSkeleton';
import ContentContainer from '../components/ContentContainer';
import CreateListModal from '../components/modal/CreateListModal';

const Dashboard = () => {
  const {
    lists,
    loading,
    error,
    handleCreateList,
    handleDeleteList,
    handleUpdateList,
  } = useFetchLists();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();


  const handleLogout = () => {
    logout()
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-200 to-purple-200 ">
      <Navbar handleLogout={handleLogout} />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Lists</h1>
            <p className="text-sm text-gray-500 mt-1">
              {lists.length} {lists.length === 1 ? 'list' : 'lists'}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow transition"
          >
            + New List
          </button>
        </div>
        <ContentContainer>
          {loading ? (
            <ListsSkeleton />
          ) : error ? (
            <DashboardMessage
              message="Couldn't load lists!"
              textColor="text-red-600"
            />
          ) : lists.length === 0 ? (
            <EmptyState 
            onCreate={() => setIsModalOpen(true)} 
            title="No lists yet"
            description="Organize your day. Start small. Stay consistent."
            buttonText="Create your first list to get started."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lists.map((list) => (
                <ListCard
                  key={list.id}
                  list={list}
                  title={list.title}
                  role={list.role}
                  createdAt={list.created_at}
                  members={list.members || []}
                  onClick={() => navigate(`/lists/${list.id}/todos`)}
                  onUpdate={(title) => handleUpdateList(list.id, title)} 
                  onDelete={() => handleDeleteList(list.id)}
                />
              ))}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 text-gray-400 text-sm font-medium min-h-30 transition cursor-pointer"
              >
                <span className="text-xl">+</span> New List
              </button>
            </div>
          )}
        </ContentContainer>
      </div>
      <CreateListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateList}
      />
    </div>
  );
};

export default Dashboard;
