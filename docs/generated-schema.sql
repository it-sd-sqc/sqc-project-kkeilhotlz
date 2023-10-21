\encoding UTF8
DROP TABLE IF EXISTS periods;
DROP TABLE IF EXISTS commas;
DROP TABLE IF EXISTS the;
DROP TABLE IF EXISTS and;

CREATE TABLE data (
  id Serial Primary Key,
  countPeriods INT NOT NULL,
  countCommas INT NOT NULL,
  countThe INT NOT NULL,
  countAnd INT NOT NULL,
);
CREATE TABLE periods (
  id SERIAL PRIMARY KEY,
  count INT NOT NULL
);
CREATE TABLE commas (
  id SERIAL PRIMARY KEY,
  count INT NOT NULL
);
CREATE TABLE the (
  id SERIAL PRIMARY KEY,
  count INT NOT NULL
);
CREATE TABLE and (
  id SERIAL PRIMARY KEY,
  count INT NOT NULL
);
INSERT INTO periods (count) VALUES (807)
INSERT INTO commas (count) VALUES (554)
INSERT INTO the (count) VALUES (807)
INSERT INTO and (count) VALUES (226)
INSERT INTO data (countPeriods) VALUES (807)
INSERT INTO data (countCommas) VALUES (554)
INSERT INTO data (countThe) VALUES (807)
INSERT INTO data (countAnd) VALUES (226)
