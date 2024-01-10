import PropertyCard from "./PropertyCard";
import PropertyDetails from "./PropertyDetails";
import { useState } from "react";
import { database } from "../firebase";
import { ref, set, push } from "firebase/database";

const DB_PROPERTIES_KEY = "properties";

function Property({ properties, currentProfile, profiles }) {
  const [uploadProperties, setUploadProperties] = useState([
    {
      id: "001",
      title: "2-Bedroom Apartment",
      description: "Apartment",
      price: "$1000",
      location: "Jurong",
      size: "4 sqft",
      imageUrl: "src/assets/property.jpeg",
    },
    {
      id: "002",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl: "src/assets/house.jpg",
    },
    {
      id: "003",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl: "src/assets/house.jpg",
    },
    {
      id: "004",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl: "src/assets/house.jpg",
    },
    {
      id: "005",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl: "src/assets/house.jpg",
    },
    {
      id: "006",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl: "src/assets/house.jpg",
    },
    {
      id: "002",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl: "src/assets/house.jpg",
    },
    {
      id: "007",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl: "src/assets/house.jpg",
    },
    {
      id: "008",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl: "src/assets/house.jpg",
    },
    {
      id: "009",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl: "src/assets/house.jpg",
    },
    {
      id: "010",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl: "src/assets/house.jpg",
      // googleURL
      // input form
    },
  ]);
  const [viewProperty, setViewProperty] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);

  const handleClick = (property) => {
    setCurrentProperty(property);
    setViewProperty(true);
  };

  const propertiesRef = ref(database, DB_PROPERTIES_KEY);

  const handleUpload = () => {
    uploadProperties.forEach((property) => {
      const newPropertyRef = push(propertiesRef);
      try {
        set(newPropertyRef, {
          id: property.id,
          title: property.title,
          description: property.description,
          price: property.price,
          location: property.location,
          size: property.size,
          url: "",
          peopleWhoLiked: [""],
          comments: [""],
        });
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-2xl font-bold my-4 text-gray-700">
        Available Properties:{" "}
      </div>
      <button onClick={handleUpload}>Upload Test Properties</button>
      {viewProperty == false ? (
        <div className="max-h-[45rem] overflow-y-auto">
          {properties.map((property, index) => (
            <div key={index} onClick={() => handleClick(property)}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <PropertyDetails
            property={currentProperty}
            currentProfile={currentProfile}
            profiles={profiles}
          />
          <button
            onClick={() => setViewProperty(false)}
            className="bg-white rounded-lg m-2 p-4 text-lg"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default Property;
