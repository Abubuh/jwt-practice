import { useEffect, useState } from 'react';
import { getLists, getListMembers, deleteList, createList, updateList } from '../services/listService';
import { useAuth } from '../routes/AuthContext';

const useFetchLists = () => {
  const { token, logout } = useAuth();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getLists();
        const listsWithMembers = await Promise.all(
          result.data.data.map(async (list) => {
            try {
              const membersResult = await getListMembers(list.id);
              return { ...list, members: membersResult.data.data };
            } catch (memberErr) {
              return { ...list, members: [] };
            }
          })
        );
        setLists(listsWithMembers);
      } catch (err) {
        if (err.isAuthError || err.response?.status === 401) {
          logout();
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchLists();
    } else {
      setLists([]);
      setLoading(false);
    }
  }, [token, logout]);

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId);
      setLists((prev) => prev.filter((list) => list.id !== listId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete list');
    }
  };

  const handleUpdateList = async (listId, title) => {
  try {
    const result = await updateList(listId, { title });
  setLists((prev) =>
    prev.map((list) =>
      list.id === listId
        ? { ...list, title: result.data.data.title } 
        : list
    )
  );
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to update list');
  }
};

  const handleCreateList = async (title) => {
    try {
      const result = await createList(title);
      setLists((prev) => [...prev, result.data.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create list');
    }
  };

  return {
    lists,
    loading,
    error,
    handleCreateList,
    handleDeleteList,
    handleUpdateList
  };
};

export default useFetchLists;
