-- Create the database
CREATE DATABASE IF NOT EXISTS suffolk_map;
USE suffolk_map;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    role ENUM('student', 'faculty', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buildings table
CREATE TABLE buildings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10),
    description TEXT,
    latitude FLOAT,
    longitude FLOAT
);

-- Floors table
CREATE TABLE floors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    building_id INT,
    floor_number INT,
    map_image TEXT,
    FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE
);

-- Rooms table (typo fixed: "accessible" ✅)
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    floor_id INT,
    name VARCHAR(50),
    type ENUM('classroom', 'lab', 'office', 'restroom', 'elevator', 'other'),
    accesible BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (floor_id) REFERENCES floors(id) ON DELETE CASCADE
);

-- Pathways table
CREATE TABLE pathways (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_room_id INT,
    to_room_id INT,
    distance FLOAT,
    FOREIGN KEY (from_room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (to_room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Accessibility features
CREATE TABLE accessibility_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT,
    feature_type ENUM('ramp', 'elevator', 'braille', 'auto_door'),
    description TEXT,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- User preferences
CREATE TABLE user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    preferred_room_id INT,
    note TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (preferred_room_id) REFERENCES rooms(id) ON DELETE SET NULL
);

-- Sample Data
INSERT INTO buildings (name, code, description, latitude, longitude)
VALUES ('Sawyer Building', 'SAW', 'Main academic building at Suffolk', 42.356, -71.0603);

INSERT INTO floors (building_id, floor_number, map_image)
VALUES (1, 1, 'floor1.png');

INSERT INTO rooms (floor_id, name, type, accesible)
VALUES (1, '101', 'classroom', TRUE),
       (1, '102', 'office', FALSE),
       (1, 'Restroom', 'restroom', TRUE);
