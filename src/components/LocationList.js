import React from "react";
import { Col, Row } from "reactstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const LocationList = (props) => {
  return (
    <>
      <Row key={props.index}>
        <Col>{props.data.location}</Col>
        <Col>{props.data.address}</Col>
        <Col>{props.data.phone}</Col>
        <Col>{props.data.country}</Col>
        <Col>{props.data.state}</Col>
        <Col>{props.data.city}</Col>
        <Col style={{ textAlign: "right" }}>
          <FaPencilAlt
            style={{
              color: "orange",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={() => props.editLocation(props.data.id)}
          />
          <FaTrash
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => props.deleteLocation(props.data.id)}
          />
        </Col>
      </Row>
    </>
  );
};

export default LocationList;
