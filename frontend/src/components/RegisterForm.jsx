import React, { useState } from 'react';
import api from '../api';

const RegisterForm = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', password: '', role: 'buyer' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      // redirect to login or dashboard
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" />
      <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
