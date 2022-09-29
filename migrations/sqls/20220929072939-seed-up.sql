/* Replace with your SQL commands */
BEGIN;
CREATE TABLE users
(
    id                SERIAL PRIMARY KEY NOT NULL,
    name              TEXT,
    surname           TEXT,
    patronymic        TEXT,
    email             TEXT NOT NULL,
    login             TEXT NOT NULL,
    password          TEXT NOT NULL,
    register_date     DATE NOT NULL,
    avatar            TEXT
);
COMMIT;
