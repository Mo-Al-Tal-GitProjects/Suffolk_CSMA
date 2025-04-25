import { clubs, dining, locations } from "../constants";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MAP_ZOOM = 17;

function clubText(name, location) {
  if (location) {
    return `${name} (${location})`;
  }

  return name;
}

function CampusMapClubs({ clubs }) {
  if (clubs.length === 0) {
    return null;
  }

  return (
    <div>
      <b>Clubs:</b>
      <ul className="marker-popup">
        {clubs.map((club) => (
          <li key={club.name}>
            {clubText(club.name, club.locationInterior)}
          </li>
        ))}
      </ul>
    </div>
  )
}

function CampusMapDining({ dining }) {
  if (dining.length === 0) {
    return null;
  }

  return (
    <div>
      <b>Dining:</b>
      <ul className="marker-popup">
        {dining.map((dining) => (
          <li key={dining.name}>{dining.name}</li>
        ))}
      </ul>
    </div>
  )
}

function CampusMapLocations({ locations, selectedLocation }) {
  const map = useMap();
  const markers = useRef(new Map());

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo(selectedLocation);
      markers.current.get(selectedLocation).openPopup();
    }
  }, [map, selectedLocation, markers]);

  return (
    <>
      {locations.map((location) => (
        <Marker key={location.name}
                position={location.coordinates}
                ref={(element) => markers.current.set(location.coordinates, element)}>
          <Popup>
            <h2>{location.name}</h2>
            {location.address}
            <br />
            <br />
            {/* The filtering is a bad idea since it'll happen on every render (at the moment, O(n^2)). */}
            <CampusMapClubs clubs={clubs.filter((club) => club.location === location.name)} />
            <CampusMapDining dining={dining.filter((dining) => dining.location === location.name)} />
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default function CampusMap({ selectedLocation }) {
  return (
    <MapContainer id="map"
                  // .leaflet-container doesn't seem to be part of the public API
                  className="map-container"
                  center={locations[0].coordinates}
                  zoom={MAP_ZOOM}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CampusMapLocations locations={locations} selectedLocation={selectedLocation}></CampusMapLocations>
    </MapContainer>
  );
}
