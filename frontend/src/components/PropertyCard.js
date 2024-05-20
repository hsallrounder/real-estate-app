import React from 'react';
import api from '../api';

const PropertyCard = ({ property, onLike, onInterested, buyerId }) => {
  const handleLikeClick = async () => {
    try {
      await api.post(`/properties/${property._id}/like`, null, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      // Call onLike function to update UI
      onLike(property._id);
    } catch (error) {
      console.error('Error liking property:', error);
    }
  };

  const handleInterestClick = async () => {
    try {
      await api.post(`/properties/${property._id}/interest`, { buyerId });
      // Call onInterested function to update UI
      onInterested(property);
    } catch (error) {
      console.error('Error expressing interest:', error);
    }
  };

  return (
    <div>
      <h3>{property.place}</h3>
      <p>Area: {property.area}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Nearby: {property.nearby.join(', ')}</p>
      <button onClick={handleLikeClick}>Like</button>
      <button onClick={handleInterestClick}>I'm Interested</button>
    </div>
  );
};

export default PropertyCard;
