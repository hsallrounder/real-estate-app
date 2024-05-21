<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="place">Place:</label>
      <input type="text" v-model="formData.place" placeholder="Place" />
    </div>
    <div>
      <label for="area">Area:</label>
      <input type="text" v-model="formData.area" placeholder="Area" />
    </div>
    <div>
      <label for="bedrooms">Bedrooms:</label>
      <input type="number" v-model="formData.bedrooms" placeholder="Bedrooms" />
    </div>
    <div>
      <label for="bathrooms">Bathrooms:</label>
      <input type="number" v-model="formData.bathrooms" placeholder="Bathrooms" />
    </div>
    <div>
      <label for="nearby">Nearby:</label>
      <input type="text" v-model="newNearby" placeholder="Add nearby place" />
      <button type="button" @click="addNearby">Add</button>
      <ul>
        <li v-for="(nearby, index) in formData.nearby" :key="index">
          {{ nearby }} <button type="button" @click="removeNearby(index)">Remove</button>
        </li>
      </ul>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  props: {
    property: Object,
  },
  data() {
    return {
      formData: {
        place: '',
        area: '',
        bedrooms: 0,
        bathrooms: 0,
        nearby: [],
        sellerId: '',
      },
      newNearby: '',
    };
  },
  watch: {
    property: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.formData = { ...newVal };
        }
      },
    },
  },
  methods: {
    async handleSubmit() {
      try {
        // Extract the seller's email from the token or other means
        const sellerEmail = localStorage.getItem('email'); // Assuming email is stored in localStorage
        this.formData.sellerId = sellerEmail;

        const method = this.property ? 'PUT' : 'POST';
        const url = 'http://localhost:4000/properties';
        
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify(this.formData),
        });

        if (response.ok) {
          this.$emit('submit');
        } else {
          console.error('Error submitting form:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    addNearby() {
      if (this.newNearby.trim()) {
        if(!this.formData.nearby) this.formData.nearby = [] 
        this.formData.nearby.push(this.newNearby.trim());
        this.newNearby = '';
      }
    },
    removeNearby(index) {
      this.formData.nearby.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
