<template>
    <div>
      <h2>Property Details</h2>
      <div v-for="property in properties" :key="property._id">
        <h3>{{ property.place }}</h3>
        <p>Area: {{ property.area }}</p>
        <p>Bedrooms: {{ property.bedrooms }}</p>
        <p>Bathrooms: {{ property.bathrooms }}</p>
        <p>Nearby: {{ property.nearby.join(', ') }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    data() {
      return {
        properties: [],
      };
    },
    async created() {
      try {
        const response = await api.get('/properties');
        this.properties = response.data;
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    },
  };
  </script>
  