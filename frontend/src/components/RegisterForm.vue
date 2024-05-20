<template>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="form.firstName" placeholder="First Name" />
      <input type="text" v-model="form.lastName" placeholder="Last Name" />
      <input type="email" v-model="form.email" placeholder="Email" />
      <input type="text" v-model="form.phoneNumber" placeholder="Phone Number" />
      <input type="password" v-model="form.password" placeholder="Password" />
      <select v-model="form.role">
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      <button type="submit">Register</button>
    </form>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    data() {
      return {
        form: {
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: '',
          role: 'buyer',
        },
      };
    },
    methods: {
      async handleSubmit() {
        try {
          await api.post('/auth/register', this.form);
          this.$router.push('/login'); // Redirect to login or dashboard
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  