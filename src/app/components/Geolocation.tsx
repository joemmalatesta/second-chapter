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
    );
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!location) return <p>Loading location...</p>;

  return (
    <div>
      <h2>Your Location</h2>
      <p>Latitude: {(location.latitude + (Math.random() * 0.6 - 0.3)).toFixed(6)}</p>
      <p>Longitude: {(location.longitude + (Math.random() * 0.6 - 0.3)).toFixed(6)}</p>
      <p>Accuracy: {location.accuracy.toFixed(2)} meters</p>
    </div>
  );
};

export default Geolocation;
