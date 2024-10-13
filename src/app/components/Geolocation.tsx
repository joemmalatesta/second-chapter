'use client';

import { useState, useEffect } from 'react';

interface GeolocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const Geolocation: React.FC = () => {
  const [location, setLocation] = useState<GeolocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
    
  const updateGeolocation = async (geolocationData: GeolocationData) => {
    try {
      const response = await fetch('/api/user/updateGeolocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(geolocationData),
      });

      if (!response.ok) {
        throw new Error('Failed to update geolocation');
      }

      console.log('Geolocation updated successfully');
    } catch (error) {
      console.error('Error updating geolocation:', error);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        setError(`Error: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      updateGeolocation(location);
    }
  }, [location]);

  if (error) return <p>Error: {error}</p>;
  if (!location) return <p>Loading location...</p>;

  return (
    <div>
      <h2>Your Location</h2>
      <p>Latitude: {location.latitude.toFixed(6)}</p>
      <p>Longitude: {location.longitude.toFixed(6)}</p>
      <p>Accuracy: {location.accuracy.toFixed(2)} meters</p>
    </div>
  );
};

export default Geolocation;
