import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { context_Property } from "../Api/PropertyContext";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function Map() {
  const { properties } = useContext(context_Property);
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const [address, setAddress] = useState("");

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(ll);
  };

  //   to limit the research
  const searchOptions = {
    componentRestrictions: { country: ["ca"] },
    // types: ['city']
  };

  const containerStyle = {
    width: "100%",
    height: "600px",
    marginTop: "20px",
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const center = {
    lat: coordinates.lat,
    lng: coordinates.lng,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "add your google map api key",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    properties.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onMarkerClicked = (property) => {
    console.log(property);
  };

  return (
    <div>
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

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          onLoad={onLoad}
          onUnmount={onUnmount}
          //   onChildClick={(child) => setChildClicked(child)}
          onChildClick={(child) => console.log(child, "haha")}
        >
          {properties?.map((property) => (
            <Marker
              key={property?._id}
              // position={{ lat: property?.latitude, lng: property?.longitude }}
              position={property.position}
              onClick={() => {
                onMarkerClicked(property);
              }}
            />
          ))}

          {/* <></> */}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Map;
