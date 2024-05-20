<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" name="firstName" placeholder="First Name" v-model="formData.firstName" required />
    <input type="text" name="lastName" placeholder="Last Name" v-model="formData.lastName" required />
    <input type="email" name="email" placeholder="Email" v-model="formData.email" required />
    <input type="text" name="phoneNumber" placeholder="Phone Number" v-model="formData.phoneNumber" required />
    <input type="password" name="password" placeholder="Password" v-model="formData.password" required />
    <select name="role" v-model="formData.role">
      <option value="buyer">Buyer</option>
      <option value="seller">Seller</option>
    </select>
    <button type="submit">Register</button>
  </form>
</template>

<script>
import api from '../api';

export default {
  name: 'RegisterPage',  // Changed from 'Register' to 'RegisterPage'
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'buyer',
      }
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await api.post('/auth/register', this.formData);
        alert('User registered successfully');
        // Redirect to login or dashboard
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Error registering user');
      }
    }
  }
};
</script>
