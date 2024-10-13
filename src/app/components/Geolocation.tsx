'use client';

import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface GeolocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const Geolocation: React.FC = () => {
  const [location, setLocation] = useState<GeolocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

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
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        setLocation(newLocation);

        // Initialize map after getting location
        if (mapContainer.current && !map.current) {
          mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [newLocation.longitude, newLocation.latitude],
            zoom: 14
          });

          // Add marker for current location
          new mapboxgl.Marker()
            .setLngLat([newLocation.longitude, newLocation.latitude])
            .addTo(map.current);
        }
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
      <div ref={mapContainer} className='outline h-96 w-full' />
    </div>
  );
};

export default Geolocation;
