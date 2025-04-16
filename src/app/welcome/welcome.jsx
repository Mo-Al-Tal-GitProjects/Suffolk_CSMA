import iconURL from "/Suffolk_University_coat_of_arms.svg";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

const clubs = [
  {
    name: "Computational Science and Mathematics Association",
    location: "Rosalie K. Stahl Center",
    locationInterior: "Floor 5"
  },
  {
    name: "Computer Science Club",
    location: "Rosalie K. Stahl Center",
    locationInterior: "Floor 5"
  },
  {
    name: "Math Society",
    location: "Rosalie K. Stahl Center",
    locationInterior: "Floor 8"
  },
];

// https://www.suffolk.edu/visit/campus-map-directions
const locations = [
  {
    name: "Rosalie K. Stahl Center",
    address: "73, Tremont Street, Beacon Hill, Boston, Suffolk County, Massachusetts, 02108, United States",
    coordinates: [42.357815, -71.061021],
  },
  {
    // ?
    name: "One Beacon Street",
    address: "1, Beacon Street, Beacon Hill, Boston, Suffolk County, Massachusetts, 02108, United States",
    coordinates: [42.358465, -71.059895],
  },
  {
    name: "Nathan R. Miller Residence Hall",
    address: "10, Somerset Street, Beacon Hill, Boston, Suffolk County, Massachusetts, 02108, United States",
    coordinates: [42.358768, -71.061768],
  },
  {
    name: "Mildred F. Sawyer Library",
    address: "8, Ashburton Place, Beacon Hill, Boston, Suffolk County, Massachusetts, 02133, United States",
    coordinates: [42.358978, -71.061771],
  },
  {
    name: "Leonard J. Samia Academic Center",
    address: "20, Somerset Street, Beacon Hill, Boston, Suffolk County, Massachusetts, 02108, United States",
    coordinates: [42.359666, -71.061825],
  },
  {
    name: "Ridgeway Building",
    address: "148, Cambridge Street, Beacon Hill, Boston, Suffolk County, Massachusetts, 02114, United States",
    coordinates: [42.361274, -71.066178],
  },
  {
    // ?
    name: "22 Beacon Street",
    address: "22, Beacon Street, Fairmount, Hyde Park, Boston, Suffolk County, Massachusetts, 02136, United States",
    coordinates: [42.253137, -71.117266],
  },
  {
    name: "Ames Building Residence Hall",
    address: "1, Court Street, Financial District, Downtown Boston, Boston, Suffolk County, Massachusetts, 02201, United States",
    coordinates: [42.359015, -71.058027],
  },
  {
    name: "David J. Sargent Hall",
    address: "120, Tremont Street, Downtown Boston, Boston, Suffolk County, Massachusetts, 02108, United States",
    coordinates: [42.356700, -71.061050],
  },
  {
    name: "Michael S. & Larry E. Smith Residence Hall",
    address: "150, Tremont Street, Beacon Hill, Boston, Suffolk County, Massachusetts, 02111, United States",
    coordinates: [42.354878, -71.063025],
  },
  // {
  //   name: "Residence Hall", // ?
  //   address: "10, West Street, Downtown Crossing, Downtown Boston, Boston, Suffolk County, Massachusetts, 02102, United States",
  //   coordinates: [42.354446, -71.062152],
  // },
  {
    name: "Modern Theatre & Residence Hall",
    address: "523,525, Washington Street, Downtown Crossing, Downtown Boston, Boston, Suffolk County, Massachusetts, 02111, United States",
    coordinates: [42.354216, -71.062240],
  },
  {
    name: "Athletics Fields",
    // This the right place?
    address: "150, Porter Street, Gove Street, East Boston, Boston, Suffolk County, Massachusetts, 02128, United States",
    coordinates: [42.370854, -71.032417],
  },
];

function CampusMapClubs({ clubs }) {
  if (clubs.length === 0) {
    return null;
  }

  return (
    <div>
      <b>Clubs:</b>
      <ul className="marker-popup-clubs">
        {clubs.map((club) => (
          <li key={club.name}>
            {club.name} ({club.locationInterior})
          </li>
        ))}
      </ul>
    </div>
  )
}

function CampusMap({ locations, selectedLocation }) {
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
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export function Welcome() {
  const [selectedLocation, setSelectedLocation] = useState();

  return (
    <div>
      <nav className="navbar">
        <img src={iconURL} alt="Suffolk University Logo" className="logo" />
      </nav>
      <section className="hero">
        <div className="hero-content">
          <h1>Explore Suffolk University Campus</h1>
          <p>Your interactive guide to navigating campus life</p>
          <div className="search-container">
            <input type="text" placeholder="Search buildings, dining, or clubs..." />
            <button className="search-btn"><i className="fas fa-search"></i></button>
          </div>
        </div>
      </section>
      <main className="container">
        <section className="map-preview">
          <h2>Campus Map Overview</h2>
          <div className="map-wrapper">
            {/* .leaflet-container doesn't seem to be part of the public API */}
            <MapContainer className="map-container"
                          center={locations[0].coordinates}
                          zoom={17}>
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <CampusMap locations={locations} selectedLocation={selectedLocation}></CampusMap>
            </MapContainer>
            <div className="map-overlay">
              <div className="map-overlay-controls">
                <div className="dropdown">
                  <button className="btn btn-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                    Clubs
                  </button>
                  <ul className="dropdown-menu">
                    {clubs.map((club) => (
                      <li className="dropdown-item" key={club.name}>
                        <button onClick={() => setSelectedLocation(locations.find((location) => location.name === club.location).coordinates)}>
                          {club.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                    Locations
                  </button>
                  <ul className="dropdown-menu" id="locDropdownMenu">
                    {locations.map((location) => (
                      <li className="dropdown-item" key={location.name}>
                        <button onClick={() => setSelectedLocation(location.coordinates)}>
                          {location.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="features-grid">
          <article className="feature-card">
            <i className="fas fa-utensils"></i>
            <h3>Dining Areas</h3>
            <p>Discover all campus dining options with live menu updates</p>
          </article>
          <article className="feature-card">
            <i className="fas fa-users"></i>
            <h3>Club Meetings</h3>
            <p>Find meeting locations and event schedules</p>
          </article>
          <article className="feature-card">
            <i className="fas fa-building"></i>
            <h3>Academic Facilities</h3>
            <p>Navigate to classrooms and lecture halls effectively</p>
          </article>
        </section>
        <div className="action-buttons">
          <button className="btn primary">View Live Map</button>
          <button className="btn secondary">Club Registration</button>
          <button className="btn outline">Events Calendar</button>
          <button className="btn outline">Get Directions</button>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="university-links">
            <a href="https://www.suffolk.edu">University Home</a>
            <a href="https://www.suffolk.edu/campus-safety">Safety</a>
            <a href="https://www.suffolk.edu/student-services">Services</a>
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/suffolk_U/"><i className="fab fa-instagram"></i></a>
            <a href="https://twitter.com/Suffolk_U"><i className="fab fa-twitter"></i></a>
            <a href="https://www.facebook.com/SuffolkUniversity"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
