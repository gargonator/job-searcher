DROP DATABASE IF EXISTS jobs;
CREATE DATABASE jobs;
USE jobs;

CREATE TABLE saved_jobs (
	id INT AUTO_INCREMENT NOT NULL,
	title VARCHAR(255) NOT NULL,
  href VARCHAR(255),
  details VARCHAR(255),
  salary_min INT,
  salary_max INT,
	loc VARCHAR(255),
	PRIMARY KEY (id)
);