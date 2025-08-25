import React, { useState, useEffect } from 'react';
import { register } from '../../services/authService.js';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/authStyle.css';
import FeritImage from '../Helpers/FeritImage.jsx';
import MathBackground from '../Helpers/MathBackground.jsx';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; 
    setLoading(true);

    if (!form.email.includes('@')) {
      toast.error('Email nije ispravan.');
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      toast.error('Lozinka mora imati najmanje 6 znakova.');
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error('Lozinke se ne podudaraju.');
      setLoading(false);
      return;
    }

    try {
      await register(form.username, form.email, form.password, form.confirmPassword);
      toast.success('Registracija uspješna!');
      navigate('/login');
    } catch (error) {
      try {
        const err = JSON.parse(error.message);
        toast.error(`${err.error}${err.details ? ` - ${err.details}` : ''}`);
      } catch {
        toast.error('Greška prilikom registracije.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MathBackground />
      <FeritImage />
      <div className="auth-wrapper">
        <form className="auth-container" onSubmit={handleSubmit}>
          <h2>Registriraj se</h2>

          <input
            className="auth-input"
            name="username"
            placeholder="Korisničko ime"
            value={form.username}
            onChange={handleChange}
            required
          />

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
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
            </span>
          </div>

          <div className="password-wrapper">
            <input
              className="auth-input"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Ponovi lozinku"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              <i className={showConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
            </span>
          </div>

          <button
            type="submit"
            className="auth-button sign-up"
            disabled={loading}
          >
            {loading ? 'Registriranje u tijeku...' : 'Registriraj se'}
          </button>

          <p className="auth-switch">
            Već imaš račun? <Link to="/login">Prijavi se</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
