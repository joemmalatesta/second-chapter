import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Point {
  lat: number;
  long: number;
  cover: string;
}

const Map: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [userLocation, setUserLocation] = useState<Point | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetch("/api/books"); // Use the same endpoint to fetch books
        const data = await response.json();

        // Format points from fetched book data
        const formattedPoints: Point[] = data.map((book: any) => ({
          lat: book.location.latitude,
          long: book.location.longitude,
          cover: book.image, // Assuming the image URL is stored in 'image'
        }));

        setPoints(formattedPoints);
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoints();
  }, []);

  useEffect(() => {
    // Map configuration
    const config = {
      minZoom: 7,
      maxZoom: 18,
    };
    const zoom = 14;
    const defaultLat = 42.323149;
    const defaultLng = -83.23072;

    // Initialize the map
    const mapInstance = L.map("map", config).setView([defaultLat, defaultLng], zoom);

    // Load and display tile layers
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    // Cleanup function to remove the map on component unmount
    return () => {
      mapInstance.remove();
    };
  }, []); // Empty dependency array, run only once on mount

  useEffect(() => {
    if (!map) return;

    // Custom icon
    const customIcon = L.icon({
      iconUrl: "pin.svg", // Update this path
      iconSize: [30, 35],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    // Add markers to the map when points are fetched
    points.forEach((point) => {
      const popupContent = `<img src="${point.cover}" alt="Marker Image" style="width: 100px; height: auto;" />`;
      L.marker([point.lat, point.long], { icon: customIcon })
        .bindPopup(popupContent)
        .addTo(map);
    });

    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setUserLocation({ lat: userLat, long: userLng, cover: "" });

          // Create a special icon for the user's location
          const userIcon = L.icon({
            iconUrl: "userpin.svg",
            iconSize: [40, 45],
            iconAnchor: [20, 45],
            popupAnchor: [1, -34],
          });

          // Add a marker for the user's location
          L.marker([userLat, userLng], { icon: userIcon })
            .bindPopup("You are here")
            .addTo(map);

          // Center the map on the user's location
          map.setView([userLat, userLng], 14);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [map, points]); // Run when map or points change

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default Map;
