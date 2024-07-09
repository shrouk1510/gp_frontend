import React, { useState } from "react";
import { FaClinicMedical, FaPills, FaUtensils } from "react-icons/fa";
import "./LocationPage.css";
import {
  getAllClinicsByLocationRequest,
  getAllPharmaciesByLocationRequest,
  getAllRestaurantsByLocationRequest,
} from "../lib/api/map";
import { Loader } from "lucide-react";

const LocationPage = () => {
  const [locations, setLocations] = useState([]);
  const [type, setType] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // New state for tracking button click

  const handleLocationRequest = (type) => {
    setType(type);
    setIsClicked(true); // Set isClicked to true when a button is clicked
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(
            `Type: ${type}, Latitude: ${latitude}, Longitude: ${longitude}`
          );

          setIsFetching(true);
          switch (type) {
            case "clinics":
              const clinics = await getAllClinicsByLocationRequest(
                latitude,
                longitude
              );
              setLocations(clinics);
              break;
            case "pharmacies":
              const pharmacies = await getAllPharmaciesByLocationRequest(
                latitude,
                longitude
              );
              setLocations(pharmacies);
              break;
            case "restaurants":
              const restaurants = await getAllRestaurantsByLocationRequest(
                latitude,
                longitude
              );
              setLocations(restaurants);
              break;
            default:
              setLocations([]);
          }
          setIsFetching(false);
        },
        (error) => {
          console.error("Error obtaining location", error);
          setIsFetching(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  return (
    <div className="location-page">
      <h1 className="title">Find Nearby Locations</h1>
      <div className={`button-container ${isClicked ? "sticky" : ""}`}>
        <button
          className="location-btn"
          onClick={() => handleLocationRequest("clinics")}
        >
          <FaClinicMedical className="icon" />
          Nearby Clinics
        </button>
        <button
          className="location-btn"
          onClick={() => handleLocationRequest("pharmacies")}
        >
          <FaPills className="icon" />
          Nearby Pharmacies
        </button>
        <button
          className="location-btn"
          onClick={() => handleLocationRequest("restaurants")}
        >
          <FaUtensils className="icon" />
          Nearby Restaurants
        </button>
      </div>
      <div className="cards-container">
        {isFetching ? (
          <div>
            <Loader scale={50} speed={10} />
          </div>
        ) : (
          <>
            {locations.length === 0 && <p>No locations found</p>}
            {locations.map((location) => (
              <div key={location.placeId} className="location-card">
                <img
                  src={location.icon}
                  alt={location.name}
                  className="location-icon"
                />
                <h2 className="location-name">{location.name}</h2>
                <p className="location-rating">Rating: {location.rating}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default LocationPage;
