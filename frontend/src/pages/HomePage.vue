<template>
  <div>
    <h2>Properties</h2>
    <PropertyCard
      v-for="property in properties"
      :key="property._id"
      :property="property"
      @like="handleLike"
      @interested="handleInterested"
    />
  </div>
</template>

<script>
import api from '../api';
import PropertyCard from '../components/PropertyCard.vue';

export default {
  name: 'HomePage',
  components: {
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
    // eslint-disable-next-line no-unused-vars
    handleLike(propertyId) {
      // Implement like functionality
    },
    // eslint-disable-next-line no-unused-vars
    handleInterested(property) {
      // Implement interested functionality
    }
  }
};
</script>
