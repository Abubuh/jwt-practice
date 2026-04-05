import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';

const MemberOptionsModal = ({
  isOpen,
  onClose,
  member,
  onChangeRole,
  onRemove,
  myRole
}) => {
  const [view, setView] = useState('options');
  const [role, setRole] = useState(member?.role || 'viewer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setView('options');
    setRole(member?.role || 'viewer');
    setError('');
    onClose();
  };

  const handleChangeRole = async () => {
    if (loading) return;
    setLoading(true);
    try{
        await onChangeRole(member.id, role);
        handleClose()
    } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
    } finally {
        setLoading(false);
    }
  }

  const handleRemove = async () => {
    if (loading) return;
    setLoading(true);
     try {
      await onRemove(member.id);
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent>

        {view === 'options' && (
          <>
            <DialogHeader>
              <DialogTitle>{member?.username}</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="flex flex-col gap-2 py-2">
              {
                  ["owner","admin"].includes(myRole) && (
                <button
                onClick={() => setView('role')}
                className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-100 transition"
                >
                🔁 Change role
              </button>)
              }
              {
                  ["owner"].includes(myRole) && (
                <button
                onClick={() => setView('remove')}
                className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-red-50 text-red-500 transition"
                >
                🗑️ Remove member
              </button>
              )}
            </div>
          </>
        )}

        {view === 'role' && (
          <>
            <DialogHeader>
              <DialogTitle>Change role</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="flex flex-col gap-2 py-2">
              <label className="text-sm font-medium text-gray-700">New role for {member?.username}</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
            <DialogFooter>
              <button onClick={() => setView('options')} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition">Back</button>
              <button
                onClick={handleChangeRole}
                disabled={loading}
                className={`px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </DialogFooter>
          </>
        )}
        {view === 'remove' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-red-500">Remove member?</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <p className="text-sm text-gray-500 py-2">
              <strong>{member?.username}</strong> will lose access to this list.
            </p>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <DialogFooter>
              <button onClick={() => setView('options')} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition">Cancel</button>
              <button
                onClick={handleRemove}
                disabled={loading}
                className={`px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Removing...' : 'Remove'}
              </button>
            </DialogFooter>
          </>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default MemberOptionsModal;
