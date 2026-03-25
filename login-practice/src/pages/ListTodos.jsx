import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../routes/AuthContext';
import { deleteList, getListById, updateList } from '../services/listService';
import {
  getTodos,
  deleteTodo,
  createTodo,
  patchTodo,
} from '../services/todoService';
import DashboardTitle from '../components/DashboardTitle';
import ContentContainer from '../components/ContentContainer';
import TodoCard from '../components/TodoCard';
import CreateTodoModal from '../components/modal/CreateTodoModal';
import InviteMemberModal from '../components/modal/InviteMemberModal';
import {
  addMember,
  removeMember,
  changeMemberRole,
} from '../services/listMemberService';
import MemberOptionsModal from '../components/modal/MemberOptionsModal';
import ListOptionsModal from '../components/modal/ListOptionsModal';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorMessage from '@/components/ErrorMessage';

const ListTodos = () => {
  const { listId } = useParams();
  const { logout, userId } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [list, setList] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  const navigate = useNavigate();
  const myRole = useMemo(() => {
    if (!list) return 'viewer';
    const me = list.members?.find((m) => m.user_id === userId);
    return me?.role || 'viewer';
  }, [list, userId]);

  const canCreateEditAssignReorder = ['owner', 'admin', 'editor'].includes(
    myRole
  );
  const canDeleteTodos = ['owner', 'admin'].includes(myRole);
  const canManageMembers = ['owner', 'admin', 'editor'].includes(myRole);

  useEffect(() => {
    const fetchListAndTodos = async () => {
      setLoading(true);
      setError(null)
      try {
        const listRes = await getListById(listId);
        const todoRes = await getTodos(listId);
        setList(listRes.data.data);
        setTodos(todoRes.data.data);
      } catch (err) {
        if (err.isAuthError || err.response?.status === 401) {
          logout();
          return;
        }
        setError(err.response?.data?.message || 'Could not load list');
      } finally {
        setLoading(false);
      }
    };

    fetchListAndTodos();
  }, [listId, logout]);

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(listId, todoId);
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const handleInviteMember = async ({ userId, role }) => {
    const result = await addMember(listId, { userId, role });
    setList((prev) => ({
      ...prev,
      members: [...(prev.members || []), result.data.data],
    }));
  };

  const handleRemoveMember = async (memberId) => {
    await removeMember(listId, memberId);
    setList((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== memberId),
    }));
  };

  const handleChangeRole = async (memberId, role) => {
    await changeMemberRole(listId, memberId, role);
    setList((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m.id === memberId ? { ...m, role } : m
      ),
    }));
  };

  const handlePatchTodo = async (todoId, data) => {
    try {
      const result = await patchTodo(listId, todoId, data);
      setTodos((prev) =>
        prev.map((todo) => {
          return todo.id === todoId ? { ...todo, ...result.data.data } : todo;
        })
      );
    } catch (err) {
      console.error(err);
      setError('Failed to update todo');
    }
  };

  const handleCreateTodo = async (data) => {
    try {
      const result = await createTodo(listId, data);
      setTodos((prev) => [...prev, result.data.data]);
    } catch (err) {
      setError('Failed to create todo');
    }
  };

  const handleToggleCompleted = async (todoId, currentCompleted) => {
    try {
      await patchTodo(listId, todoId, { completed: !currentCompleted });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !currentCompleted } : todo
        )
      );
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteList = async () => {
    try {
      await deleteList(listId);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete list');
    }
  };

  const handleUpdateList = async (title) => {
    try {
      const result = await updateList(listId, { title });
      setList((prev) => ({ ...prev, title: result.data.data.title }));
    } catch (err) {
      console.error(err);
      setError('Failed to update list');
    }
  };


  return (
    <>
      <div className="min-h-screen max-w-6xl mx-auto from-blue-200 to-purple-200 p-8 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <DashboardTitle title={list?.title || 'Untitled'} />
          <div className="flex items-center gap-2">
            {canCreateEditAssignReorder && (
              <>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg shadow-sm transition"
                >
                  Create Todo
                </button>
              </>
            )}
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-gray-700 border border-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg shadow-sm transition"
            >
              Back
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="bg-white text-red-600 border border-red-600 hover:bg-red-50 px-4 py-2 rounded-lg shadow-sm transition"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div>
            <ContentContainer>
              {
                loading ?  (
                  <LoadingSkeleton/>
                )
                  :
                  error ? (
                    <ErrorMessage type="error"  />
                    
                  ) :
                  <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    Todos
                  </h2>
    
                  {todos.length === 0 ? (
                    <p className="mt-3 text-gray-600">No todos yet</p>
                  ) : (
                    <ul className="mt-3 space-y-3">
                      {todos.map((todo) => (
                        <li key={todo.id}>
                          <TodoCard
                            todo={todo}
                            canCreateEditAssignReorder={canCreateEditAssignReorder}
                            canDeleteTodos={canDeleteTodos}
                            listId={listId}
                            deleteTodo={handleDeleteTodo}
                            onToggleCompleted={handleToggleCompleted}
                            onPatch={handlePatchTodo}
                            members={list?.members || []}
                            ></TodoCard>
                        </li>
                      ))}
                    </ul>
                  )}
                
                  </>
              }
            </ContentContainer>
          </div>
          <aside className="self-start rounded-xl bg-white p-4 shadow-inner">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Members</h3>

              {['owner', 'admin'].includes(myRole) && (
                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="border rounded-md py-1 px-3 border-black"
                >
                  Invite
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {list?.members?.map((member) => (
                <div
                  key={member.user_id}
                  className="flex items-center justify-between rounded border border-gray-200 bg-gray-50 p-2"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-700">
                      {member.username}
                    </div>
                    <div className="text-xs text-gray-500">{member.role}</div>
                  </div>
                  {canManageMembers && member.role !== 'owner' && (
                    <button
                      onClick={() => {
                        setSelectedMember(member);
                        setIsMemberModalOpen(true);
                      }}
                      className="rounded px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-100"
                    >
                      ⋮
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 text-xs text-gray-500 mb-2">
              Your role: <span className="font-semibold">{myRole}</span>
            </div>
            {['owner', 'admin', 'editor'].includes(myRole) && (
              <button className='border px-2 py-1 w-full  border-black rounded-md cursor-pointer hover:bg-gray-200' onClick={() => setIsListModalOpen(true)}>
                ⚙️ List settings
              </button>
            )}
          </aside>
        </div>
      </div>
      <CreateTodoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTodo}
        members={list?.members || []}
      />
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteMember}
        existingMembers={list?.members || []}
      />
      {selectedMember && (
        <MemberOptionsModal
          isOpen={isMemberModalOpen}
          onClose={() => {
            setIsMemberModalOpen(false);
            setSelectedMember(null);
          }}
          member={selectedMember}
          onChangeRole={handleChangeRole}
          onRemove={handleRemoveMember}
          myRole={myRole}
        />
      )}
      <ListOptionsModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        list={list}
        onUpdate={handleUpdateList}
        onDelete={handleDeleteList}
        role={myRole}
      />
    </>
  );
};

export default ListTodos;
