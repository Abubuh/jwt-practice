import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const CreateListModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (title.trim().length < 4) {
      setError('Title must be at least 4 characters');
      return;
    }
    if (title.trim().length > 50) {
      setError('Title must be less than 50 characters');
      return;
    }
    if(loading) return; 
    setLoading(true)
    try {
      await onCreate(title.trim());
      setTitle('');
      setError('');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }finally{
      setLoading(false)
    }
  };

  const handleClose = () => {
  setTitle('');
  setError('');
  onClose();
};

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose()}}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new list</DialogTitle>
          <DialogDescription/>
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
            placeholder="e.g. Shopping, Work Tasks..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <DialogFooter>
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : '' }`}
          >
            Create list
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListModal;
