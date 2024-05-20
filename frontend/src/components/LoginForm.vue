<template>
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model="form.email" placeholder="Email" />
      <input type="password" v-model="form.password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await api.post('/auth/login', this.form);
          localStorage.setItem('token', response.data.token);
          this.$router.push('/'); // Redirect to the dashboard or home page
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  