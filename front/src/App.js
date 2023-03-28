import React from "react";
import { PropertyContext } from "./Api/PropertyContext";
import Map from "./Map/Map";

function App() {
  return (
    <PropertyContext>
      <Map />
      {/* <Autocomplete /> */}
    </PropertyContext>
  );
}

export default App;
