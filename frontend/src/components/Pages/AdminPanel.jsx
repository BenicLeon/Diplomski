import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../services/userService';
import { FaUserEdit, FaTrashAlt, FaUser, FaEnvelope } from 'react-icons/fa';
import Sidebar from '../Helpers/Sidebar';
import EditUserModal from '../Modals/EditUserModal';
import { toast } from 'react-toastify';
import '../../css/adminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Greška pri dohvaćanju korisnika: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Jesi siguran da želiš obrisati ovog korisnika?')) return;

    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      toast.success('Korisnik uspješno obrisan.');
    } catch (error) {
      toast.error('Greška pri brisanju korisnika: ' + error.message);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditingUser(null);
    setShowEditModal(false);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-panel">
      <Sidebar />
      <main className="admin-main">
        <div className="user-grid">
          {users.map(user => (
            <div className="user-card" key={user.id}>
              <div className="user-info">
                <div className="user-row">
                  <FaUser className="info-icon" />
                  <span className="user-name">{user.username}</span>
                </div>
                <div className="user-row">
                  <FaEnvelope className="info-icon" />
                  <span className="user-email">{user.email}</span>
                </div>
              </div>
              <div className="actions">
                <button className="edit-btn" onClick={() => handleEditClick(user)}>
                  <FaUserEdit /> Uredi
                </button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                  <FaTrashAlt /> Obriši
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showEditModal && editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={handleEditModalClose}
          onSave={fetchUsers}
        />
      )}
    </div>
  );
};

export default AdminPanel;
