<template>
    <div>
      <h3>{{ property.place }}</h3>
      <p>Area: {{ property.area }}</p>
      <p>Bedrooms: {{ property.bedrooms }}</p>
      <p>Bathrooms: {{ property.bathrooms }}</p>
      <p>Nearby: {{ property.nearby.join(', ') }}</p>
      <button @click="handleLikeClick">Like</button>
      <button @click="handleInterestClick">I'm Interested</button>
    </div>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    props: {
      property: Object,
      onLike: Function,
      onInterested: Function,
      buyerId: String,
    },
    methods: {
      async handleLikeClick() {
        try {
          await api.post(`/properties/${this.property._id}/like`, null, {
            headers: { Authorization: localStorage.getItem('token') },
          });
          this.onLike(this.property._id);
        } catch (error) {
          console.error('Error liking property:', error);
        }
      },
      async handleInterestClick() {
        try {
          await api.post(`/properties/${this.property._id}/interest`, { buyerId: this.buyerId });
          this.onInterested(this.property);
        } catch (error) {
          console.error('Error expressing interest:', error);
        }
      },
    },
  };
  </script>
  