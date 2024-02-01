import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Random = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [defaultImages, setDefaultImages] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=17241914-90da7b93c0ccceb734849dcd1&q=${query}&image_type=photo`
      );

      // Pixabay response structure is different
      setImages(response.data.hits);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const fetchDefaultImages = async () => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=17241914-90da7b93c0ccceb734849dcd1&per_page=5&image_type=photo`
      );

      // Pixabay response structure is different
      setDefaultImages(response.data.hits);
    } catch (error) {
      console.error('Error fetching default images:', error);
    }
  };

  useEffect(() => {
    fetchDefaultImages();
  }, []); // Run once on component mount

  return (
    <div className="container mt-4 pt-5">
      <div className="row">
        <div className="col-8">
          <input
            type="text"
            className="form-control inpu"
            placeholder="Search for images..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-4">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="row mt-4">
        {query === '' // Display default images if no search query
          ? defaultImages.map((image) => (
              <div key={image.id} className="col-3 mb-3">
                <img
                  src={image.webformatURL}
                  alt={image.tags}
                  className="img-fluid"
                />
              </div>
            ))
          : images.map((image) => (
              <div key={image.id} className="col-3 mb-3">
                <img
                  src={image.webformatURL}
                  alt={image.tags}
                  className="img-fluid"
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Random;
