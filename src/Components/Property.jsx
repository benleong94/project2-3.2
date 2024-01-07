import React from 'react'
import PropertyCard from './PropertyCard';

function Property() {
  const property = [
    {
      title: "2-Bedroom Apartment",
      description: "Apartment in the city center.",
      imageUrl: "src/assets/property.jpeg",
    },
    {
      title: "2-Bedroom Apartment",
      description: "Apartment in the city center.",
      imageUrl: "src/assets/property.jpeg",
    },
    {
      title: "2-Bedroom Apartment",
      description: "Apartment in the city center.",
      imageUrl: "src/assets/property.jpeg",
    },
    {
      title: "2-Bedroom Apartment",
      description: "Apartment in the city center.",
      imageUrl: "src/assets/property.jpeg",
    },
    {
      title: "2-Bedroom Apartment",
      description: "Apartment in the city center.",
      imageUrl: "src/assets/property.jpeg",
    },
    {
      title: "2-Bedroom Apartment",
      description: "Apartment in the city center.",
      imageUrl: "src/assets/property.jpeg",
    },
    {
      title: "2-Bedroom Apartment",
      description: "Apartment in the city center.",
      imageUrl: "src/assets/property.jpeg",
    },
    {
      title: "2-Bedroom Apartment",
      description: "Apartment in the city center.",
      imageUrl: "src/assets/property.jpeg",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-2xl font-bold my-4 text-gray-700">
        Available Properties:{" "}
      </div>
      <div className="max-h-[45rem] overflow-y-auto">
        {property.map((property) => (
          <PropertyCard property={property} />
        ))}
      </div>
    </div>
  );
}

export default Property