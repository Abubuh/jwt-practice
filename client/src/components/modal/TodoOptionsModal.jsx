import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';

const TodoOptionsModal = ({
  isOpen,
  onClose,
  todo,
  onDelete,
  onPatch,
  members,
  canDeleteTodos,
}) => {
  const [view, setView] = useState('edit');
  const [form, setForm] = useState({
    title: todo?.title || '',
    description: todo?.description || '',
    priority: todo?.priority || 'low',
    assignedTo: todo?.assigned_to || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setView('edit');
    setForm({
      title: todo?.title || '',
      description: todo?.description || '',
      priority: todo?.priority || 'low',
      assignedTo: todo?.assigned_to || '',
    });
    setError('');
    onClose();
  };

  const handlePatch = async () => {
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    if (form.title.trim().length < 4) {
      setError('Min 4 characters');
      return;
    }
    if (form.title.trim().length > 250) {
      setError('Max 250 characters');
      return;
    }
    try {
      if (loading) return;
      setLoading(true);
      await onPatch(todo.id, {
        ...form,
        assignedTo: form.assignedTo === '' ? null : form.assignedTo,
      });
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (loading) return;
      setLoading(true);
      await onDelete(todo.id);
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
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
        {view === 'edit' && (
          <>
            <DialogHeader>
              <DialogTitle>Edit todo</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="flex flex-col gap-3 py-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, title: e.target.value }));
                    setError('');
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  onKeyDown={(e) => e.key === 'Enter' && handlePatch()}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Optional..."
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, priority: e.target.value }))
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Assign to
                </label>
                <select
                  value={form.assignedTo}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, assignedTo: e.target.value }))
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">— Unassigned —</option>
                  {members.map((member) => (
                    <option key={member.user_id} value={member.user_id}>
                      {member.username}
                    </option>
                  ))}
                </select>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
            <DialogFooter>
              <div className="flex w-full justify-between">
                {canDeleteTodos && (
                  <button
                    onClick={() => setView('delete')}
                    className="self-start px-4 py-2 cursor-pointer text-sm border border-black text-blac rounded-lg hover:bg-gray-200 transition font-semibold"
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                )}
                <div className="flex gap-2">
                  <button
                    disabled={loading}
                    onClick={handleClose}
                    className="px-4 py-2 text-sm text-black cursor-pointer border border-black hover:bg-gray-200 rounded-lg  transition"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    onClick={handlePatch}
                    className="px-4 py-2 text-sm bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </DialogFooter>
          </>
        )}
        {view === 'delete' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-red-500">Delete todo?</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <p className="text-sm text-gray-500 py-2">
              This will permanently delete <strong>{todo?.title}</strong>.
            </p>
            <DialogFooter>
              <button
                onClick={() => setView('edit')}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
              >
                 {loading ? 'Deleting...' : '🗑️ Delete'}
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TodoOptionsModal;
