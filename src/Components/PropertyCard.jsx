import React from "react";
import {Card, Button} from "react-bootstrap";

function PropertyCard({ property }) {

  return (
    <div className="my-4 mx-3">
      <Card style={{ width: "40rem" }}>
        <Card.Img variant="top" src={property.val.url} />
        <Card.Body>
          <Card.Title>{property.val.title}</Card.Title>
          <Card.Text>
              ID: {property.val.id}
              <br />
              Price: {property.val.price}
              <br />
              Location: {property.val.location}
              <br />
              Size: {property.val.size} 
          </Card.Text>
        </Card.Body>
      </Card>  
    </div>
  );
}

export default PropertyCard;
