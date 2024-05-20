import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';
import PropertyForm from '../components/PropertyForm';

const SellerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/properties', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const handleAddProperty = () => {
    setEditingProperty(null);
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      await api.delete(`/properties/${propertyId}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setProperties(properties.filter(property => property._id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleFormSubmit = () => {
    setEditingProperty(null);
    fetchProperties();
  };

  const fetchProperties = async () => {
    try {
      const response = await api.get('/properties', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  return (
    <div>
      <h2>Seller Dashboard</h2>
      <button onClick={handleAddProperty}>Add Property</button>
      {editingProperty && <PropertyForm property={editingProperty} onSubmit={handleFormSubmit} />}
      {properties.map(property => (
        <div key={property._id}>
          <h3>{property.place}</h3>
          <button onClick={() => handleEditProperty(property)}>Edit</button>
          <button onClick={() => handleDeleteProperty(property._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default SellerDashboard;
