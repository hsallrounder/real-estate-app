<template>
  <div class="dashboard-container">
    <h2>Buyer Dashboard</h2>
    <p>Welcome to your dashboard, {{ user.firstName }}!</p>
    <!-- Add buyer-specific content here -->
  </div>
</template>

<script>
export default {
  name: 'BuyerDashboardPage',
  data() {
    return {
      user: {
        firstName: 'Buyer', // Fetch this data dynamically based on the logged-in user
      }
    };
  }
};
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.dashboard-container h2 {
  text-align: center;
  margin-bottom: 1rem;
}
</style>
