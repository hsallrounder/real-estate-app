<template>
  <div>
    <NavBarComponent />
    <div class="home-container">
      <h1>Welcome to Rentify</h1>
      <p>Your one-stop solution for renting properties.</p>
      <h2>Properties</h2>
      <PropertyCard
        v-for="property in properties"
        :key="property._id"
        :property="property"
        @like="handleLike"
        @interested="handleInterested"
      />
    </div>
  </div>
</template>

<script>
import api from '../api';
import NavBarComponent from '../components/NavBarComponent.vue';
import PropertyCard from '../components/PropertyCard.vue';

export default {
  name: 'HomePage',
  components: {
    NavBarComponent,
    PropertyCard
  },
  data() {
    return {
      properties: [],
      currentPage: 1,
      pageSize: 10,
    };
  },
  created() {
    this.fetchProperties();
  },
  methods: {
    async fetchProperties() {
      try {
        const response = await api.get(`/properties?page=${this.currentPage}&limit=${this.pageSize}`);
        this.properties = response.data;
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    },
    handleLike() {
      // Implement like functionality
    },
    handleInterested() {
      // Implement interested functionality
    }
  }
};
</script>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.home-container h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.home-container p {
  text-align: center;
  margin-bottom: 2rem;
}

.home-container h2 {
  margin-bottom: 1rem;
}
</style>
