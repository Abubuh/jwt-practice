import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { searchUsers } from '../../services/userService';

const InviteMemberModal = ({ isOpen, onClose, onInvite, existingMembers = [] }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [role, setRole] = useState('viewer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (value) => {
    setQuery(value);
    setSelected(null);
    if (value.trim().length < 3) {
      setResults([]);
      return;
    }
    setSearching(true);
    try {
      const res = await searchUsers(value.trim());
      const filtered = res.data.data.filter(
        (u) => !existingMembers.some((m) => m.user_id === u.id)
      );
      setResults(filtered);
    } catch (err) {
  setError(err.response?.data?.message || 'Search failed');
    } finally {
      setSearching(false);
    }
  };

  const handleClose = () => {
    setQuery('');
    setResults([]);
    setSelected(null);
    setRole('viewer');
    setError('');
    onClose();
  };

  const handleInvite = async () => {
    if (!selected) { setError('Select a user first'); return; }
    if (loading) return;
    setLoading(true);
    try {
      await onInvite({ userId: selected.id, role });
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite member</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Search user</label>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Type at least 3 characters..."
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          {searching && <p className="text-xs text-gray-400">Searching...</p>}
          {results.length > 0 && !selected && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {results.map((user) => (
                <button
                  key={user.id}
                  onClick={() => { setSelected(user); setResults([]); setQuery(user.username); }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 border-b border-gray-100 last:border-none transition"
                >
                  {user.username}
                </button>
              ))}
            </div>
          )}
          {query.length >= 3 && results.length === 0 && !searching && !selected && (
            <p className="text-xs text-gray-400">No users found</p>
          )}
          {selected && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                {selected.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-blue-700">{selected.username}</span>
              <button
                onClick={() => { setSelected(null); setQuery(''); }}
                className="ml-auto text-blue-400 hover:text-blue-600 text-xs"
              >
                ✕
              </button>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <DialogFooter>
          <button onClick={handleClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition">Cancel</button>
          <button
            onClick={handleInvite}
            disabled={loading || !selected}
            className={`px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold ${loading || !selected ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Inviting...' : 'Invite'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberModal;