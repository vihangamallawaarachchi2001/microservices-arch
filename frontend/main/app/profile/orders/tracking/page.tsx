'use client'
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';


export default function OrderTracking({ orderId }) {
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await axios.get(`/track-order/${orderId}`);
        setTrackingData(response.data);
      } catch (err) {
        setError('Failed to fetch tracking data');
      }
    };

    const interval = setInterval(fetchTrackingData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [orderId]);

  if (error) return <p>{error}</p>;
  if (!trackingData) return <p>Loading...</p>;

  const { deliveryLocation, hotels, driverLocation } = trackingData;

  return (
    <MapContainer center={[deliveryLocation.lat, deliveryLocation.lng]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Delivery Location */}
      <Marker position={[deliveryLocation.lat, deliveryLocation.lng]}>
        <Popup>Delivery Location</Popup>
      </Marker>

      {/* Hotels */}
      {hotels.map((hotel, index) => (
        <Marker key={index} position={[hotel.location.lat, hotel.location.lng]}>
          <Popup>{hotel.name}</Popup>
        </Marker>
      ))}

      {/* Driver Location */}
      {driverLocation && (
        <Marker position={[driverLocation.lat, driverLocation.lng]}>
          <Popup>Driver Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}