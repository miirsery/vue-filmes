/* Replace with your SQL commands */
BEGIN;

CREATE TABLE person
(
    id                SERIAL PRIMARY KEY NOT NULL,
    name              TEXT,
    surname           TEXT,
    patronymic        TEXT,
    role              TEXT NOT NULL DEFAULT 'user',
    email             TEXT UNIQUE NOT NULL,
    login             TEXT UNIQUE NOT NULL,
    password          TEXT NOT NULL,
    register_date     TIMESTAMP NOT NULL default now(),
    birthdate         DATE,
    avatar            TEXT
);

CREATE TABLE cinema
(
    id              SERIAL PRIMARY KEY NOT NULL,
    title           TEXT,
    address         TEXT,
    location        TEXT,
    phone           TEXT
);

CREATE TABLE movie
(
    id              SERIAL PRIMARY KEY NOT NULL,
    title           TEXT NOT NULL,
    studio          TEXT,
    genre           TEXT,
    description     TEXT,
    release_date    DATE,
    preview         TEXT
);

CREATE TABLE employee
(
    id              SERIAL PRIMARY KEY NOT NULL,
    name			TEXT,
    surname		    TEXT,
    patronymic	    TEXT,
    birthdate	    DATE,
    cinema_id		INT NOT NULL,
    rate			INT,
    position		TEXT,

    CONSTRAINT      cinema_id  FOREIGN KEY(cinema_id) REFERENCES cinema(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE hall
(
    id              SERIAL PRIMARY KEY NOT NULL,
    title           INT,
    seats_count     INT,
    cinema_id       INT,

    CONSTRAINT      cinema_id  FOREIGN KEY(cinema_id) REFERENCES cinema(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE session
(
    id              SERIAL PRIMARY KEY NOT NULL,
    date            DATE NOT NULL,
    time            TIME,
    hall_id         INT,
    movie_id        INT,

    CONSTRAINT      hall_id FOREIGN KEY(hall_id) REFERENCES hall(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT      movie_id FOREIGN KEY(movie_id) REFERENCES movie(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ticket
(
    id              SERIAL PRIMARY KEY NOT NULL,
    session_id		INT,
    seat			INT,
    user_id		    INT,
    price			INT,
    seller_id		INT,
    buy_date		TIMESTAMP NOT NULL DEFAULT now(),

    FOREIGN KEY (session_id) REFERENCES session(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES employee(id) ON DELETE CASCADE ON UPDATE CASCADE
);

COMMIT;
