import iconURL from "/Suffolk_University_coat_of_arms.svg";
import { locations, clubs, dining, locs, landmarks } from "../constants";
import { lazy, Suspense, useEffect, useState } from "react";

const CampusMap = lazy(() => import("./CampusMap"));

function searchOption(key, name, location) {
  return (
    <option key={key} value={name}>{location}</option>
  );
}

function CampusMapWrapper({ selectedLocation }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CampusMap selectedLocation={selectedLocation} />
    </Suspense>
  )
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
            <CampusMapWrapper selectedLocation={selectedLocation} />
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
