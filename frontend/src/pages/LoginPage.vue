<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" name="email" placeholder="Email" v-model="formData.email" required />
    <input type="password" name="password" placeholder="Password" v-model="formData.password" required />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import api from '../api';

export default {
  name: 'LoginPage',  // Changed from 'Login' to 'LoginPage'
  data() {
    return {
      formData: {
        email: '',
        password: '',
      }
    };
  },
  methods: {
    handleChange(e) {
      const { name, value } = e.target;
      this.formData[name] = value;
    },
    async handleSubmit() {
      try {
        const response = await api.post('/auth/login', this.formData);
        const { token } = response.data;
        localStorage.setItem('token', token);
        alert('Login successful');
        // Redirect to the home page or dashboard
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in');
      }
    }
  }
};
</script>
