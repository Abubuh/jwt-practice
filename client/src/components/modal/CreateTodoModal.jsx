import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';

const CreateTodoModal = ({ isOpen, onClose, onCreate, members = [] }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'low',
    assignedTo: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);    

  const handleClose = () => {
    setForm({ title: '', description: '', priority: 'low', assignedTo: '' });
    setError('');
    onClose();
  };

  const handleCreate = async () => {
      if (!form.title.trim()) { setError('Title is required'); return; }
      if (form.title.trim().length < 4) { setError('Min 4 characters'); return; }
      if (form.title.trim().length > 250) { setError('Max 250 characters'); return; }
      if(loading) return;
      setLoading(true)
    try {
      await onCreate({
        title: form.title.trim(),
        description: form.description.trim() || null,
        priority: form.priority,
        assignedTo: form.assignedTo === '' ? null : form.assignedTo,
      });
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }finally{
        setLoading(false)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create todo</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => { setForm((p) => ({ ...p, title: e.target.value })); setError(''); }}
              placeholder="What needs to be done?"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Optional..."
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <select
              value={form.priority}
              onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value }))}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Assign to</label>
            <select
              value={form.assignedTo}
              onChange={(e) => setForm((p) => ({ ...p, assignedTo: e.target.value }))}
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
          <button onClick={handleClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition">Cancel</button>
          <button onClick={handleCreate} className={`px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : '' }`}>
           {loading ? 'Creating...' : 'Create'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoModal;