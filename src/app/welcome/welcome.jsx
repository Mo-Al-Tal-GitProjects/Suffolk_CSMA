import iconURL from "/Suffolk_University_coat_of_arms.svg";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function Welcome() {
  // Rosalie K. Stahl Center: 73 Tremont Street, Boston, Massachusetts
  const coordinates = [42.357813, -71.061027];

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
          {/* .leaflet-container doesn't seem to be part of the public API */}
          <MapContainer className="map-container"
                        center={coordinates}
                        zoom={18}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
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
