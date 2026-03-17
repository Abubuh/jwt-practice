import { useEffect, useState } from 'react';
import { getLists, getListMembers, deleteList } from '../services/listService';
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
      console.error(err);
    }
  };

  return {
    lists,
    loading,
    error,
    handleDeleteList,
  };
};

export default useFetchLists;