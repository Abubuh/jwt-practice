import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';
import PencilIcon from '../icons/PencilIcon';

const ListOptionsModal = ({ isOpen, onClose, list, onDelete, onUpdate, role }) => {
  const [view, setView] = useState('options');
  const [title, setTitle] = useState(list?.title || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setView('options');
    setTitle(list?.title || '');
    setError('');
    onClose();
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (title.trim().length < 4) {
      setError('Min 4 characters');
      return;
    }
    if (title.trim().length > 50) {
      setError('Max 50 characters');
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      await onUpdate(title.trim());
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }finally{
      setLoading(false)
    }
  };

  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onDelete();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }finally{
      setLoading(false)
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent>
        {view === 'options' && (
          <>
            <DialogHeader>
              <DialogTitle>{list?.title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 py-2">
              <button
                onClick={() => {
                  setTitle(list?.title || '');
                  setView('edit');
                  setError('');
                }}
                className="w-full flex gap-2 items-center text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-100 transition"
              >
                <PencilIcon/> Edit title
              </button>
              {
                ["owner"].includes(role) && (
                <button
                onClick={() => setView('delete')}
                className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-red-50 text-red-500 transition"
                >
                🗑️ Delete list
              </button>
                )
              }
            </div>
          </>
        )}
        {view === 'edit' && (
          <>
            <DialogHeader>
              <DialogTitle>Edit list</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 py-2">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError('');
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
            <DialogFooter>
              <button
                onClick={() => setView('options')}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </DialogFooter>
          </>
        )}
        {view === 'delete' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-red-500">Delete list?</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <p className="text-sm text-gray-500 py-2">
              This will permanently delete <strong>{list?.title}</strong> and
              all its todos.
            </p>
            <DialogFooter>
              <button
                onClick={() => setView('options')}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ListOptionsModal;
