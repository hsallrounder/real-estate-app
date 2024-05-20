import React, { useState, useEffect } from 'react';
import api from '../api';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await api.get(`/properties?page=${currentPage}&limit=${pageSize}`);
      setProperties(response.data);
    };
    fetchProperties();
  }, [currentPage, pageSize]);

  const handleLike = async (propertyId) => {
    // Implement like functionality
  };

  const handleInterested = (property) => {
    // Implement interested functionality
  };

  return (
    <div>
      <h2>Properties</h2>
      {properties.map(property => (
        <PropertyCard key={property._id} property={property} onLike={handleLike} onInterested={handleInterested} />
      ))}
    </div>
  );
};

export default Home;
