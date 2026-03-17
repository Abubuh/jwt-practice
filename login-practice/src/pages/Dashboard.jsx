import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardMessage from '../components/DashboardMessage';
import DashboardTitle from '../components/DashboardTitle';
import DashboardNav from '../components/DashboardNav';
import DashboardNavContainer from '../components/DashboardNavContainer';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../routes/AuthContext';
import api from '../services/api';
import useFetchLists from '../hooks/useFetchLists';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ContentContainer from '../components/ContentContainer';
import ListCard from '../components/ListCard';
const Dashboard = () => {
  const {lists, loading, error } =useFetchLists()
  const navigate = useNavigate();
  const { token, setToken } = useAuth()
  
    useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token]);

  const handleLogout = () => {
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-200 to-purple-200 p-8">
      <div className="max-w-5xl mx-auto">
        <DashboardNavContainer>
          <DashboardTitle title="Your Tasks ✨" />
          <DashboardNav handleLogout={handleLogout} />
        </DashboardNavContainer>
        <ContentContainer>

          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <DashboardMessage
              message="Couldn't load lists! Try again later!"
              textColor="text-red-800"
            />
          ) : lists.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-4 mt-1">
              {lists.map((list) => (
                <ListCard
                  key={list.id}
                  title={list.title}
                  description={list.description}
                  role={list.role}
                  createdAt={list.created_at || list.createdAt}
                  members={list.members || []}
                  onClick={() => navigate(`/lists/${list.id}/todos`)}
                />
              ))}
            </div>
          )}
        </ContentContainer>
      </div>
    </div>
  );
};

export default Dashboard;
