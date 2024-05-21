<template>
  <div>
    <NavBarComponent />
    <div class="register-container">
      <h2>Sign Up</h2>
      <form @submit.prevent="register">
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" v-model="firstName" required />
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" v-model="lastName" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="phoneNumber">Phone Number:</label>
          <input type="text" v-model="phoneNumber" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <div>
          <label for="role">Role:</label>
          <select v-model="role" required>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>

<script>
import NavBarComponent from '../components/NavBarComponent.vue';
import api from '../api';

export default {
  name: 'RegisterPage',
  components: {
    NavBarComponent
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: 'buyer',
    };
  },
  methods: {
    async register() {
      try {
        await api.post('/auth/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          password: this.password,
          role: this.role,
        });
        this.$router.push('/login');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-container h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.register-container form {
  display: flex;
  flex-direction: column;
}

.register-container div {
  margin-bottom: 1rem;
}

.register-container label {
  display: block;
  margin-bottom: 0.5rem;
}

.register-container input,
.register-container select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.register-container button {
  padding: 0.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.register-container button:hover {
  background-color: #555;
}
</style>
