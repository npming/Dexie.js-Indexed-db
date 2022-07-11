import React from "react";
import { Col, Row } from "reactstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css";
import NumberFormat from "react-number-format";
import { v4 as uuidv4 } from "uuid";

import { LocationContext } from "../LocationContext";

const AddLocation = (props) => {
  const LocationData = React.useContext(LocationContext);

  const [state, setState] = React.useState({});

  React.useEffect(() => {
    if (!props.editing) {
      setState({ ...state, id: uuidv4() });
    } else {
      setState({ ...state, id: props.data.id });
    }
  }, []);

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleDropdown(data, item) {
    if (item === "country") {
      setState({ ...state, country: data });
    } else {
      setState({ ...state, state: data });
    }
  }

  function handleLocation(e) {
    if (!props.editing) {
      LocationData.handleSubmit(state);
    } else {
      LocationData.UpdateLocation(state);
    }
    setState({});
    e.preventDefault();
  }

  function handleClose() {
    //LocationData.handleSubmit({});
    setState({});
    props.close();
  }

  return (
    <div className="addLocation-form-wrapper">
      <button className="btn-close" onClick={handleClose}>
        X close
      </button>
      <form onSubmit={(e) => handleLocation(e)}>
        <Row>
          <Col>
            {/* location */}
            <label>
              Location Name:
              <input
                required
                type="text"
                name="location"
                value={
                  state.location
                    ? state.location
                    : props.editing
                    ? props.data.location
                    : ""
                }
                onChange={(e) => handleChange(e)}
              />
            </label>
            {/* address */}
            <label>
              address:
              <input
                required
                type="text"
                name="address"
                value={
                  state.address
                    ? state.address
                    : props.editing
                    ? props.data.address
                    : ""
                }
                onChange={(e) => handleChange(e)}
              />
            </label>
            {/* phone */}
            <label>
              phone:
              <NumberFormat
                className="phoneInput"
                format="+91 #####-#####"
                allowEmptyFormatting
                mask="_"
                name="phone"
                value={
                  state.phone
                    ? state.phone
                    : props.editing
                    ? props.data.phone
                    : ""
                }
                onChange={(e) => handleChange(e)}
              />
            </label>
          </Col>
          <Col>
            {/* country */}
            <label>
              country:
              <CountryDropdown
                name="country"
                value={
                  state.country
                    ? state.country
                    : props.editing
                    ? props.data.country
                    : ""
                }
                onChange={(e) => handleDropdown(e, "country")}
              />
            </label>
            {/* state */}
            <label>
              state:
              <RegionDropdown
                name="state"
                country={props.editing ? props.data.country : state.country}
                value={
                  state.state
                    ? state.state
                    : props.editing
                    ? props.data.state
                    : ""
                }
                onChange={(e) => handleDropdown(e, "state")}
              />
            </label>
            {/* city */}
            <label>
              city:
              <input
                type="text"
                name="city"
                value={
                  state.city ? state.city : props.editing ? props.data.city : ""
                }
                onChange={(e) => handleChange(e)}
              />
            </label>
          </Col>
        </Row>
        {/* Submit */}
        <input className="submit-btn" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddLocation;
