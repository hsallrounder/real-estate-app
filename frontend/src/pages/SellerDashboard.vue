<template>
  <div>
    <h2>Seller Dashboard</h2>
    <button @click="handleAddProperty">Add Property</button>
    <PropertyForm v-if="editingProperty !== null" :property="editingProperty" @submit="handleFormSubmit" />
    <div v-for="property in properties" :key="property._id">
      <h3>{{ property.place }}</h3>
      <p>Area: {{ property.area }}</p>
      <p>Bedrooms: {{ property.bedrooms }}</p>
      <p>Bathrooms: {{ property.bathrooms }}</p>
      <p>Nearby: {{ property.nearby.join(', ') }}</p>
      <button @click="handleEditProperty(property)">Edit</button>
      <button @click="handleDeleteProperty(property._id)">Delete</button>
    </div>
  </div>
</template>

<script>
import api from '../api';
import PropertyForm from '../components/PropertyForm.vue';

export default {
  components: {
    PropertyForm,
  },
  data() {
    return {
      properties: [],
      editingProperty: null,
    };
  },
  async created() {
    await this.fetchProperties();
  },
  methods: {
    async fetchProperties() {
      try {
        const response = await api.get('/properties', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        this.properties = response.data;
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    },
    handleAddProperty() {
      this.editingProperty = {};
    },
    handleEditProperty(property) {
      this.editingProperty = { ...property };
    },
    async handleDeleteProperty(propertyId) {
      try {
        await api.delete(`/properties/${propertyId}`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        this.properties = this.properties.filter(property => property._id !== propertyId);
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    },
    handleFormSubmit() {
      this.editingProperty = null;
      this.fetchProperties();
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
