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
      imageUrl:
        "https://a0.muscache.com/im/pictures/miso/Hosting-13903824/original/82d996fb-d7c4-46a8-a713-febd281cd69f.jpeg?im_w=1200",
    },
    {
      id: "002",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl:
        "https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9fd.jpeg?im_w=1200",
    },
    {
      id: "003",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl:
        "https://a0.muscache.com/im/pictures/airflow/Hosting-1112254/original/e6bed0e6-6190-4119-bd80-d12d369cea19.jpg?im_w=1200",
    },
    {
      id: "004",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl:
        "https://a0.muscache.com/im/pictures/miso/Hosting-1021699523679171741/original/292c0f2a-a851-4a50-a3b5-834faf91b836.jpeg?im_w=1200",
    },
    {
      id: "005",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl:
        "https://a0.muscache.com/im/pictures/miso/Hosting-42654284/original/c87c0f17-3159-4619-b408-2a368618d7a9.jpeg?im_w=1200",
    },
    {
      id: "006",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl:
        "https://a0.muscache.com/im/pictures/miso/Hosting-566028065891205462/original/8272f279-b785-4533-b9e5-b400a37d6a52.jpeg?im_w=1200",
    },
    {
      id: "002",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl:
        "https://a0.muscache.com/im/pictures/miso/Hosting-899236914237980180/original/c59dce38-3a76-4efc-ba1d-44c9b30101b4.jpeg?im_w=1200",
    },
    {
      id: "007",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl:
        "https://a0.muscache.com/im/pictures/miso/Hosting-792742639858876908/original/bdf7942e-2c10-4acd-b653-820b9ed4dae5.jpeg?im_w=1200",
    },
    {
      id: "008",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl:
        "https://a0.muscache.com/im/pictures/miso/Hosting-776408013311849576/original/d1dfe4d3-950d-4aa2-afc6-f83b51c3f227.jpeg?im_w=1200",
    },
    {
      id: "009",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl:
        "https://a0.muscache.com/im/pictures/miso/Hosting-651792739552139367/original/4451b587-769a-44c6-9eb4-0e6500f42c42.jpeg?im_w=1200",
    },
    {
      id: "010",
      title: "3-Bedroom Apartment",
      description: "Condo",
      price: "$2000",
      location: "Lakeside",
      size: "6 sqft",
      imageUrl:
        "https://a0.muscache.com/im/pictures/miso/Hosting-54064179/original/3bfbb323-e459-409d-99f8-b2fadd1c4a97.jpeg?im_w=1200",
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
          url: property.imageUrl,
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
