CREATE DATABASE IF NOT EXISTS health_app;
USE health_app;


CREATE TABLE user_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    age INT,
    poids FLOAT,
    taille FLOAT,
    rhesus VARCHAR(50),
    allergies TEXT,
    email VARCHAR(255)
);

CREATE TABLE prescriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255),
    medication_name VARCHAR(255),
    dosage_quantity FLOAT,
    dosage_frequency VARCHAR(100),
    dosage_duration VARCHAR(100),
    start_date DATE,
    end_date DATE,
    notes TEXT
);
