import iconURL from "/Suffolk_University_coat_of_arms.svg";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

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
  {
    name: "Residence Hall", // ?
    address: "10, West Street, Downtown Crossing, Downtown Boston, Boston, Suffolk County, Massachusetts, 02102, United States",
    coordinates: [42.354446, -71.062152],
  },
  {
    name: "Modern Theatre & Residence Hall",
    address: "523,525, Washington Street, Downtown Crossing, Downtown Boston, Boston, Suffolk County, Massachusetts, 02111, United States",
    coordinates: [42.354216, -71.062240],
  },
  // {
  //   name: "Athletics Fields",
  //   // This the right place?
  //   address: "150, Porter Street, Gove Street, East Boston, Boston, Suffolk County, Massachusetts, 02128, United States",
  //   coordinates: [42.370854, -71.032417],
  // },
];

const locs = locations.reduce((m, location, i) => m.set(location.name, i), new Map())

// https://www.suffolk.edu/student-life/student-involvement/clubs-organizations/clubs-at-suffolk
const clubs = [
  {
    // Not incorporated.
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
  {
    name: "Finance and Investing Club",
    location: "Rosalie K. Stahl Center"
  }
];

// https://www.suffolk.edu/student-life/housing-dining/dining-options
const dining = [
  {
    name: "150 Tremont Café",
    location: "Michael S. & Larry E. Smith Residence Hall",
  },
  {
    name: "Café 73",
    location: "Rosalie K. Stahl Center",
  },
  {
    name: "Miller Café",
    location: "Nathan R. Miller Residence Hall",
  },
  {
    name: "Smith Café",
    location: "Michael S. & Larry E. Smith Residence Hall",
  },
  {
    name: "Sargent Café",
    location: "David J. Sargent Hall",
  },
  {
    name: "One Court Café",
    location: "Ames Building Residence Hall",
  },
  {
    name: "Market at Sawyer",
    location: "Mildred F. Sawyer Library",
  }
];

const landmarks = locations
  .map((location) => ({
    name: location.name,
    location: location.name
  }))
  .concat(clubs)
  .concat(dining)
  .reduce((m, mark) => m.set(mark.name, mark.location), new Map());

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
            <CampusMapDining dining={dining.filter((dining) => dining.location === location.name)} />
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function searchOption(key, name, location) {
  return (
    <option key={key} value={name}>{location}</option>
  );
}

export function Welcome() {
  const [selectedLocation, setSelectedLocation] = useState();

  return (
    <div>
      <nav className="navbar">
        <a href="/">
          <img src={iconURL} alt="Suffolk University Logo" className="logo" />
        </a>
      </nav>
      <section className="hero">
        <div className="hero-content">
          <h1>Explore Suffolk University Campus</h1>
          <p>Your interactive guide to navigating campus life</p>
        </div>
        <form className="search-container" action={(data) => setSelectedLocation(locations[locs.get(landmarks.get(data.get("query")))]?.coordinates)}>
          <input className="form-control"
                 name="query"
                 placeholder="Search buildings, clubs, or dining..."
                 list="searchOptions" />
          <button className="search-btn">
            <i className="fas fa-search" />
          </button>
          <datalist id="searchOptions">
            {locations.map((location) => searchOption(location.name, location.name, location.address))}
            {clubs.map((club) => searchOption(club.name, club.name, club.location))}
            {dining.map((dining) => searchOption(dining.name, dining.name, dining.location))}
          </datalist>
        </form>
      </section>
      <main className="container">
        <section className="map-preview">
          <h2>Campus Map Overview</h2>
          <div className="map-wrapper">
            {/* .leaflet-container doesn't seem to be part of the public API */}
            <MapContainer id="map"
                          className="map-container"
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
                        <button onClick={() => setSelectedLocation(locations[locs.get(club.location)]?.coordinates)}>
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
          <a className="btn primary" href="/#map">View Live Map</a>
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
