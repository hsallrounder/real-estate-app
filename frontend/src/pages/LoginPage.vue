<template>
  <div>
    <NavBarComponent />
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
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
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <router-link to="/register">Sign Up</router-link></p>
    </div>
  </div>
</template>

<script>
import NavBarComponent from '../components/NavBarComponent.vue';
import api from '../api';

export default {
  name: 'LoginPage',
  components: {
    NavBarComponent
  },
  data() {
    return {
      email: '',
      password: '',
      role: 'buyer',
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post('/auth/login', {
          email: this.email,
          password: this.password,
          role: this.role,
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('role', this.role);
        localStorage.setItem('email', this.email)

        if (this.role === 'seller') {
          this.$router.push('/seller-dashboard');
        } else {
          this.$router.push('/buyer-dashboard');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-container h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.login-container form {
  display: flex;
  flex-direction: column;
}

.login-container div {
  margin-bottom: 1rem;
}

.login-container label {
  display: block;
  margin-bottom: 0.5rem;
}

.login-container input,
.login-container select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.login-container button {
  padding: 0.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.login-container button:hover {
  background-color: #555;
}
</style>
