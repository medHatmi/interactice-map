import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import "../../src/App.css";

function Autocomplete() {
  // needed states for all address coordinates
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setPovince] = useState("");
  const [country, setCountry] = useState("");
  const [blLat, setBlLat] = useState("");
  const [trLat, setTrLat] = useState("");
  const [blLng, setBlLng] = useState("");
  const [trLng, setTrLng] = useState("");

  // latitude and longitude
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  //to fill data on states
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const result = await geocodeByPlaceId(results[0].place_id);
    const ll = await getLatLng(results[0]);

    // console.log("northeast",result[0].geometry.viewport.Bb);
    // console.log( "southewest", result[0].geometry.viewport.Va);

    setAddress(value);
    setCoordinates(ll);
    setNumber(result[0].address_components[0].long_name);
    setStreet(result[0].address_components[1].long_name);
    setCity(result[0].address_components[3].long_name);
    setPostalCode(result[0].address_components[8].long_name);
    setPovince(result[0].address_components[6].long_name);
    setCountry(result[0].address_components[7].long_name);
    setBlLat(result[0].geometry.viewport.Ab.lo);
    setTrLat(result[0].geometry.viewport.Ab.hi);
    setBlLng(result[0].geometry.viewport.Va.hi);
    setTrLng(result[0].geometry.viewport.Va.lo);
  };

  //   to limit the research
  const searchOptions = {
    componentRestrictions: { country: ["ca"] },
    // types: ['city']
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div key={suggestions.description}>
          <input
            {...getInputProps({
              placeholder: "Search your address ...",
              className: "location-search-input",
            })}
            //
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? {
                    backgroundColor: "purple",
                    color: "white",
                    cursor: "pointer",
                  }
                : {
                    backgroundColor: "black",
                    color: "white",
                    cursor: "pointer",
                  };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default Autocomplete;
