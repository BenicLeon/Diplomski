import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { updateUser } from '../../services/userService';
import '../../css/editUserModal.css';

const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {
      username: formData.username,
      email: formData.email,
    };

    if (formData.password.trim() !== '') {
      updatedFields.password = formData.password;
    }

    try {
      await updateUser(user.id, updatedFields);
      toast.success('Podaci uspješno ažurirani.');
      onSave();
      onClose();
    } catch (error) {
      toast.error(error?.message || 'Greška pri ažuriranju korisnika.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Uredi korisnika</h2>
        <form onSubmit={handleSubmit}>
          <label>Korisničko ime</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Lozinka</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ostavi prazno ako ne želiš promijeniti"
          />

          <button type="submit" className="save-button">Spremi</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
