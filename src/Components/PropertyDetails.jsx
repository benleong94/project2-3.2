import React from 'react'

function PropertyDetails({property}) {
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Property Details
      </h2>
      <div className="mb-2">
        <span className="font-medium text-gray-600">Property ID: </span>
        <span className="text-gray-700">{property.id}</span>
      </div>
      <div className="mb-2">
        <span className="font-medium text-gray-600">Location: </span>
        <span className="text-gray-700">{property.location}</span>
      </div>
      <div className="mb-2">
        <span className="font-medium text-gray-600">Price: </span>
        <span className="text-gray-700">{property.price}</span>
      </div>
      <div className="mb-2">
        <span className="font-medium text-gray-600">Size: </span>
        <span className="text-gray-700">{property.size}</span>
      </div>
      <div className="mb-1">Click to see who liked this property!</div>
    </div>
  );
}

export default PropertyDetails