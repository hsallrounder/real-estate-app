import React, { useEffect, useState } from 'react';
import api from '../api';

const PropertyDetails = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <h2>Property Details</h2>
      <div>
        {properties.map(property => (
          <div key={property._id}>
            <h3>{property.place}</h3>
            <p>Area: {property.area}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Nearby: {property.nearby.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetails;
