/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LiveTracking = () => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const mapContainerRef = useRef(null);
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        if (mapRef.current) return; // Prevent reinitialization

        mapRef.current = L.map(mapContainerRef.current, {
            doubleClickZoom: false, // Disable default double-click zoom
        }).setView([0, 0], 15);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapRef.current);

        markerRef.current = L.marker([0, 0]).addTo(mapRef.current);

        // Function to update position
        const updatePosition = (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });

            if (mapRef.current && markerRef.current) {
                markerRef.current.setLatLng([latitude, longitude]);
                mapRef.current.setView([latitude, longitude], 15);
            }
        };

        // Get current position once
        navigator.geolocation.getCurrentPosition(updatePosition);

        // Auto-update position every 10 seconds
        const watchId = navigator.geolocation.watchPosition(updatePosition, console.error, {
            enableHighAccuracy: true,
            maximumAge: 10000, // 10 seconds
            timeout: 5000,
        });

        // Cleanup function
        return () => {
            navigator.geolocation.clearWatch(watchId);
            if (mapRef.current) {
                mapRef.current.off("dblclick");
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return <div ref={mapContainerRef} id="map" style={{ width: "100%", height: "100%" }} />;
};

export default LiveTracking;
