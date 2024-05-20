import React, { useState } from 'react';
import config from '../config';

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    // form data fields
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${config.apiBaseUrl}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // handle success
    } else {
      // handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
};

export default PropertyForm;
