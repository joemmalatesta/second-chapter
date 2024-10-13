// components/Map.tsx
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map: React.FC = () => {
  const position1 = [42.323149, -83.23072];
  const position2 = [42.923149, -83.23072];
  useEffect(() => {
    // Configuration for the map
    const config = {
      minZoom: 7,
      maxZoom: 18,
    };
    const zoom = 14;
    const marker1 = L.latLng(position1);
    const marker2 = L.latLng(position2);

    const distance = marker1.distanceTo(marker2); // Distance in meters

    console.log(`Distance between markers: ${distance} meters`);

    // const points: [number, number, string][] = [
    //   [
    //     42.323149,
    //     -83.23072,
    //     "https://www.animalhospitalofclemmons.com/files/AdobeStock290844781.jpeg",
    //   ],
    //   [42.923149, -83.23072, "point 2"],
    //   [43.323149, -83.23072, "point 3"],
    //   [42.323149, -83.43072, "point 4"],
    // ];

    // Initialize the map
    const map = L.map("map", config).setView([lat, lng], zoom);

    // Load and display tile layers
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Custom icon
    const customIcon = L.icon({
      iconUrl: "/mappin.jpg", // Update this path
      iconSize: [30, 35], // Size of the icon
      iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
      popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
    });

    // Add markers to the map
    points.forEach(([markerLat, markerLng, imageUrl]) => {
      const popupContent = `<img src="${imageUrl}" alt="Marker Image" style="width: 100px; height: auto;" />`;
      L.marker([markerLat, markerLng], { icon: customIcon })
        .bindPopup(popupContent)
        .addTo(map);
    });

    // Cleanup function to remove the map on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default Map;
