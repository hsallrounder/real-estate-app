<template>
    <form @submit.prevent="handleSubmit">
      <!-- form fields -->
      <input type="text" v-model="formData.field1" placeholder="Field 1" />
      <!-- Add other fields similarly -->
      <button type="submit">Submit</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          field1: '',
          // Add other fields here
        },
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await fetch('http://localhost:4000/properties', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.formData),
          });
  
          if (response.ok) {
            // handle success
          } else {
            // handle error
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      },
    },
  };
  </script>
  