import React from "react";
import {Card, Button} from "react-bootstrap";

function PropertyCard({ property }) {

  return (
    <div className="my-4 mx-3">
      <Card style={{ width: "40rem" }}>
        <Card.Img variant="top" src={property.imageUrl} />
        <Card.Body>
          <Card.Title>{property.title}</Card.Title>
          <Card.Text>
              ID: {property.id}
              <br />
              Price: {property.price}
              <br />
              Location: {property.location}
              <br />
              Size: {property.size} 
          </Card.Text>
        </Card.Body>
      </Card>  
    </div>
  );
}

export default PropertyCard;
