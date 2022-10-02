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

CREATE TABLE session
(
    id              SERIAL PRIMARY KEY NOT NULL,
    time            TEXT,
    date            DATE,
    movie_id        INT REFERENCES movies(id) ON DELETE CASCADE,
    cinema_id       INT REFERENCES cinemas(id) ON DELETE CASCADE
);

COMMIT;
