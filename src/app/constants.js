// https://www.suffolk.edu/visit/campus-map-directions
export const locations = [
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

export const locs = locations.reduce((m, location, i) => m.set(location.name, i), new Map())

// https://www.suffolk.edu/student-life/student-involvement/clubs-organizations/clubs-at-suffolk
export const clubs = [
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
export const dining = [
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

export const landmarks = locations
  .map((location) => ({
    name: location.name,
    location: location.name
  }))
  .concat(clubs)
  .concat(dining)
  .reduce((m, mark) => m.set(mark.name, mark.location), new Map());
