import sqlite from "node:sqlite";

const database = new sqlite.DatabaseSync(":memory:");
database.exec(`
  CREATE TABLE locations (
    rowid INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
  );

  CREATE TABLE clubs (
    rowid INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    location INTEGER NOT NULL REFERENCES locations
  );
`);

const insertLocation = database.prepare("INSERT INTO locations (name, address, latitude, longitude) VALUES (:name, :address, :latitude, :longitude)");
const insertClub = database.prepare("INSERT INTO clubs (name, location) VALUES (:name, :location)")
const rosalieStahlCenter = insertLocation.run({
  name: "Rosalie K. Stahl Center",
  address: "73, Tremont Street, Beacon Hill, Boston, Suffolk County, Massachusetts, 02108, United States",
  latitude: 42.357815,
  longitude: -71.061021,
});

const locations = [
  {
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
    name: "Modern Theatre & Residence Hall",
    address: "523,525, Washington Street, Downtown Crossing, Downtown Boston, Boston, Suffolk County, Massachusetts, 02111, United States",
    coordinates: [42.354216, -71.062240],
  },
  {
    name: "Athletics Fields",
    address: "150, Porter Street, Gove Street, East Boston, Boston, Suffolk County, Massachusetts, 02128, United States",
    coordinates: [42.370854, -71.032417],
  },
];

locations.forEach((location) => insertLocation.run({
  name: location.name,
  address: location.address,
  latitude: location.coordinates[0],
  longitude: location.coordinates[1],
}));

const clubs = [
  "Computational Science and Mathematics Association",
  "Computer Science Club",
  "Math Society",
];

clubs.forEach((club) => insertClub.run({
  name: club,
  location: rosalieStahlCenter.lastInsertRowid
}));

console.log(Array.from(database.prepare("SELECT * FROM locations").iterate()));
console.log(Array.from(database.prepare("SELECT * FROM clubs").iterate()));
