BEGIN;

CREATE TABLE users
(
    id                SERIAL PRIMARY KEY NOT NULL,
    name              TEXT,
    surname           TEXT,
    patronymic        TEXT,
    email             TEXT NOT NULL,
    username          TEXT NOT NULL,
    password          TEXT NOT NULL,
    register_date     DATE NOT NULL,
    avatar            TEXT
);

END;
