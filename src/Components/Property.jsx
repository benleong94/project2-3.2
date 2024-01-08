import PropertyCard from './PropertyCard';
import PropertyDetails from './PropertyDetails';
import { useState } from 'react';

function Property() {
  const [properties, setProperties] = useState([
    {
      id: "123",
      title: "2-Bedroom Apartment",
      description: "Apartment in the city center.",
      price: "$1000",
      location: "Jurong",
      size: "4 sqft",
      imageUrl: "src/assets/property.jpeg",
    },
    {
      id: "234",
      title: "2-Bedroom Apartment",
      description: "Apartment in the city center.",
      price: "$1000",
      location: "Jurong",
      size: "4 sqft",
      imageUrl: "src/assets/property.jpeg",
    },
  ]);
  const [viewProperty, setViewProperty] = useState(false)
  const [currentProperty, setCurrentProperty] = useState(null)

  const handleClick = (property) => {
    setCurrentProperty(property); 
    setViewProperty(true);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-2xl font-bold my-4 text-gray-700">
        Available Properties:{" "}
      </div>
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
          <PropertyDetails property={currentProperty} />
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

export default Property