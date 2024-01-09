import React, { useEffect } from 'react'
import { useState } from 'react';
import { database } from "../firebase";
import { set, ref, update } from "firebase/database";
import { Button, Modal } from "react-bootstrap";

function PropertyDetails({property, currentProfile, profiles}) {
  const [viewPropertyLikes, setViewPropertyLikes] = useState(false);
  const [likedUsers, setLikedUsers] = useState([])

  const DB_PROPERTIES_KEY = "properties";
  const propertiesRef = ref(database, DB_PROPERTIES_KEY);

  const likeProperty = () => {
    let displayedProperty = property;
    displayedProperty.val.peopleWhoLiked.push(currentProfile.key);
    const updates = {};
    updates[property.key] = {
      id: displayedProperty.val.id,
      title: displayedProperty.val.title,
      description: displayedProperty.val.description,
      price: displayedProperty.val.price,
      location: displayedProperty.val.location,
      size: displayedProperty.val.size,
      url: displayedProperty.val.url,
      peopleWhoLiked: displayedProperty.val.peopleWhoLiked,
    };
    update(propertiesRef, updates);
  };

  const handleClose = () => {
    setViewPropertyLikes(false);
  };

  useEffect(() => {
    const nameArray = [];
    property.val.peopleWhoLiked.forEach( person => {
      profiles.map(profile => {
        profile.key == person ? nameArray.push(profile.val.name) : null
      })
    });
    setLikedUsers(nameArray)
  }, [property])

  return (
    <>
      <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Property Details
        </h2>
        <div className="mb-2">
          <span className="font-medium text-gray-600">Property ID: </span>
          <span className="text-gray-700">
            {property.val.PropertyDetailsid}
          </span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-600">Location: </span>
          <span className="text-gray-700">{property.val.location}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-600">Price: </span>
          <span className="text-gray-700">{property.val.price}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-600">Size: </span>
          <span className="text-gray-700">{property.val.size}</span>
        </div>
        <div
          className="mb-1 text-lg"
          onClick={() => {
            setViewPropertyLikes(true);
          }}
        >
          Click to see who liked this property!
        </div>
      </div>
      <button
        className="bg-white rounded-lg m-2 p-4 text-lg"
        onClick={likeProperty}
      >
        Like This Property!
      </button>
      <Modal show={viewPropertyLikes} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#333", color: "white" }}>
          <Modal.Title>People Who Liked: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {likedUsers.map((user, index) => 
            <p key={index}>{user}</p>
          )}
        </Modal.Body>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal>
    </>
  );
}

export default PropertyDetails