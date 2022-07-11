import React, { useState, useEffect } from "react";
import "./App.css";
// database
import { db as database } from "./db";
// context
import { LocationContext } from "./LocationContext";
// components
import AddLocation from "./components/AddLocation";
import LocationList from "./components/LocationList";
import { Container, Col, Row, Button } from "reactstrap";
import { FaPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  //set the state and property

  const [LocationState, setLocationState] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});

  function handleSubmit(data) {
    database.location.add(data, data.id).then(async () => {
      // update location state
      setLocationState((prev) => [...prev, data]);
      setOpen(!isOpen);
    });
  }

  function UpdateLocation(data) {
    database.location.update(data.id, data).then(function (updated) {
      if (updated) {
        setCurrentLocation({});
        setOpen(!isOpen);
      }
    });
  }

  useEffect(() => {
    const getLocations = async () => {
      let locationData = await database.location.toArray();
      // set location on refresh
      setLocationState(locationData);
    };
    getLocations();
  }, []);

  async function editLocation(id) {
    const data = await database.location.get(id);
    setEditing(!editing);
    setOpen(!isOpen);
    setCurrentLocation(data);
  }

  function deleteLocation(id) {
    database.location.delete(id);
    const newLocationState = LocationState.filter((items) => items.id != id);
    setLocationState(newLocationState);
  }

  function handleClose() {
    setOpen(!isOpen);
  }

  return (
    <div className="App">
      <LocationContext.Provider
        value={{
          LocationState,
          handleSubmit: handleSubmit,
          UpdateLocation: UpdateLocation,
        }}
      >
        <Container fluid={true}>
          <Row>
            <Col>
              <h3>Location Manager</h3>
            </Col>
            <Col style={{ textAlign: "right" }}>
              <Button
                style={{
                  background: "#265c96",
                  borderRadius: "20px",
                  width: "150px",
                  position: "relative",
                }}
                onClick={() => setOpen(!isOpen)}
              >
                <FaPlus style={{ fontSize: "12px" }} /> Add Location
              </Button>
            </Col>
          </Row>

          <hr />

          {isOpen ? (
            <AddLocation
              data={currentLocation}
              editing={editing}
              close={handleClose}
            />
          ) : null}

          {LocationState &&
            LocationState.map((items, i) => (
              <>
                <LocationList
                  data={items}
                  index={i}
                  editLocation={editLocation}
                  deleteLocation={deleteLocation}
                />
                <hr />
              </>
            ))}
        </Container>
      </LocationContext.Provider>
    </div>
  );
};

export default App;
