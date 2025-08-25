import React, { useState, useEffect } from 'react';
import { login } from '../../services/authService.js';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/authStyle.css';
import MathBackground from '../Helpers/MathBackground.jsx';
import FeritImage from '../Helpers/FeritImage.jsx';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) navigate('/home');
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form.email, form.password);
      localStorage.setItem(
        'user',
        JSON.stringify({ id: data.id, username: data.username, token: data.token, role: data.role })
      );
      toast.success('Prijava uspješna!');
      navigate('/home');
    } catch (error) {
      toast.error(error?.message || 'Greška prilikom prijave.');
    }
  };

  return (
    <>
      <MathBackground />
      <FeritImage />
      <div className="auth-wrapper">
        <form className="auth-container" onSubmit={handleSubmit}>
          <h2>Prijavi se</h2>

          <input
            className="auth-input"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="password-wrapper">
            <input
              className="auth-input"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Lozinka"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
            </span>
          </div>

          <button type="submit" className="auth-button sign-in">
            Prijava
          </button>

          <p className="auth-switch">
            Nemaš račun? <Link to="/register">Registriraj se</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
