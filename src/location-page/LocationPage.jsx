import React, { useState } from 'react';
import { FaClinicMedical, FaPills, FaUtensils } from 'react-icons/fa';
import './LocationPage.css';

const exampleClinics = [
    {
        "formattedAddress": null,
        "geometry": {
            "bounds": null,
            "location": {
                "lat": 30.00557920000001,
                "lng": 31.1454159
            },
            "locationType": null,
            "viewport": {
                "northeast": {
                    "lat": 30.0069338302915,
                    "lng": 31.1467552802915
                },
                "southwest": {
                    "lat": 30.0042358697085,
                    "lng": 31.1440573197085
                }
            }
        },
        "name": "Dar El Oyoun Hospital",
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/hospital-71.png",
        "placeId": "ChIJ2ZzK3KNGWBQRvA5TpfApUSk",
        "scope": "GOOGLE",
        "rating": 3.7,
        "types": [
            "hospital",
            "health",
            "point_of_interest",
            "establishment"
        ]
    }
];

const examplePharmacies = [
    {
        "formattedAddress": null,
        "geometry": {
            "bounds": null,
            "location": {
                "lat": 29.98295479999999,
                "lng": 31.1129777
            },
            "locationType": null,
            "viewport": {
                "northeast": {
                    "lat": 29.9842731302915,
                    "lng": 31.1143087302915
                },
                "southwest": {
                    "lat": 29.9815751697085,
                    "lng": 31.1116107697085
                }
            }
        },
        "name": "El Marwa",
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/pharmacy-71.png",
        "placeId": "ChIJ85u7sGJFWBQRNUssvm4Z3Iw",
        "scope": "GOOGLE",
        "rating": 4,
        "types": [
            "pharmacy",
            "health",
            "store",
            "point_of_interest",
            "establishment"
        ]
    }
];

const exampleRestaurants = [
    {
        "formattedAddress": null,
        "geometry": {
            "bounds": null,
            "location": {
                "lat": 29.9799181,
                "lng": 31.1448816
            },
            "locationType": null,
            "viewport": {
                "northeast": {
                    "lat": 29.9812812802915,
                    "lng": 31.1462294302915
                },
                "southwest": {
                    "lat": 29.97858331970851,
                    "lng": 31.1435314697085
                }
            }
        },
        "name": "Mohamed’s house",
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        "placeId": "ChIJP7KGmnFAWBQR3seoxY7aqbY",
        "scope": "GOOGLE",
        "rating": 5,
        "types": [
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
        ]
    }
];

const LocationPage = () => {
    const [locations, setLocations] = useState([]);
    const [type, setType] = useState('');

    const handleLocationRequest = (type) => {
        setType(type);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(`Type: ${type}, Latitude: ${latitude}, Longitude: ${longitude}`);
                    // Simulate fetching location-based data

                    switch(type) {
                        case 'clinics':
                            setLocations(exampleClinics);
                            break;
                        case 'pharmacies':
                            setLocations(examplePharmacies);
                            break;
                        case 'restaurants':
                            setLocations(exampleRestaurants);
                            break;
                        default:
                            setLocations([]);
                    }
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
            <div className="cards-container">
                {locations.length === 0 && <p>No locations found</p>}
                {locations.map((location) => (
                    <div key={location.placeId} className="location-card">
                        <img src={location.icon} alt={location.name} className="location-icon" />
                        <h2 className="location-name">{location.name}</h2>
                        <p className="location-rating">Rating: {location.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationPage;