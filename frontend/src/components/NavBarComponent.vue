<template>
  <nav>
    <ul>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/register">Sign Up</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBarComponent'
};
</script>

<style scoped>
nav {
  background-color: #333;
  color: white;
  padding: 1rem;
}

ul {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
}

li {
  margin: 0 1rem;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
