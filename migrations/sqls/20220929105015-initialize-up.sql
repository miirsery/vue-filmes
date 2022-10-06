/* Replace with your SQL commands */
BEGIN;

CREATE TABLE users
(
    id                SERIAL PRIMARY KEY NOT NULL,
    name              TEXT,
    surname           TEXT,
    patronymic        TEXT,
    role              TEXT NOT NULL DEFAULT 'user',
    email             TEXT UNIQUE NOT NULL,
    login             TEXT UNIQUE NOT NULL,
    password          TEXT NOT NULL,
    register_date     TIMESTAMP NOT NULL,
    avatar            TEXT
);

CREATE TABLE movies
(
    id              SERIAL PRIMARY KEY NOT NULL,
    title           TEXT NOT NULL,
    description     TEXT,
    release_date    DATE,
    preview         TEXT
);

CREATE TABLE cinemas
(
    id              SERIAL PRIMARY KEY NOT NULL,
    street          TEXT,
    location        TEXT
);

CREATE TABLE halls
(
    id              SERIAL PRIMARY KEY NOT NULL,
    title           INT DEFAULT 0,
    seats_count     INT DEFAULT 1,
    cinema_id       INT,
    CONSTRAINT      cinema_id  FOREIGN KEY(cinema_id) REFERENCES cinemas(id) ON DELETE CASCADE
);

CREATE TABLE sessions
(
    id              SERIAL PRIMARY KEY NOT NULL,
    time            TEXT,
    date            TIMESTAMP NOT NULL,
    price           INT NOT NULL,
    hall_id         INT REFERENCES halls(id) ON DELETE CASCADE
);

COMMIT;
