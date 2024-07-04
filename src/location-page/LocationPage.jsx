// src/components/location/LocationPage.js

import React from 'react';
import { FaClinicMedical, FaPills, FaUtensils } from 'react-icons/fa';
import './LocationPage.css';

const LocationPage = () => {
    const handleLocationRequest = (type) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(`Type: ${type}, Latitude: ${latitude}, Longitude: ${longitude}`);
                    // Here you can make a backend request to get the nearby locations
                    // Example:
                    // fetch(`/api/nearby?type=${type}&lat=${latitude}&lng=${longitude}`)
                    //   .then(response => response.json())
                    //   .then(data => console.log(data));
                },
                (error) => {
                    console.error('Error obtaining location', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser');
        }
    };

    return (
        <div className="location-page">
            <h1 className="title">Find Nearby Locations</h1>
            <div className="button-container">
                <button className="location-btn" onClick={() => handleLocationRequest('clinics')}>
                    <FaClinicMedical className="icon" />
                    Nearby Clinics
                </button>
                <button className="location-btn" onClick={() => handleLocationRequest('pharmacies')}>
                    <FaPills className="icon" />
                    Nearby Pharmacies
                </button>
                <button className="location-btn" onClick={() => handleLocationRequest('restaurants')}>
                    <FaUtensils className="icon" />
                    Nearby Restaurants
                </button>
            </div>
        </div>
    );
};

export default LocationPage;
