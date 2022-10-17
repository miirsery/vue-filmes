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
    discount          NUMERIC DEFAULT 0 CHECK ( discount >= 0 ),
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
    cinema_id		SERIAL,
    rate			INT,
    position		TEXT,

    CONSTRAINT      fk_cinema  FOREIGN KEY(cinema_id) REFERENCES cinema(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE hall
(
    id              SERIAL PRIMARY KEY NOT NULL,
    title           INT,
    seats_count     INT,
    cinema_id       SERIAL,

    CONSTRAINT      fk_cinema  FOREIGN KEY(cinema_id) REFERENCES cinema(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE session
(
    id              SERIAL PRIMARY KEY NOT NULL,
    date            DATE NOT NULL,
    time            TIME,
    hall_id         SERIAL,
    movie_id        SERIAL,

    CONSTRAINT      fk_hall FOREIGN KEY(hall_id) REFERENCES hall(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT      fk_movie FOREIGN KEY(movie_id) REFERENCES movie(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ticket
(
    id              SERIAL PRIMARY KEY NOT NULL,
    seat			INT,
    price			INT,
    buy_date		TIMESTAMP NOT NULL DEFAULT now(),
    session_id		SERIAL,
    seller_id		SERIAL,
    user_id		    SERIAL,
    movie_id        SERIAL,

    CONSTRAINT      fk_movie FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT      fk_session FOREIGN KEY (session_id) REFERENCES session(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT      fk_user FOREIGN KEY (user_id) REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT      fk_seller FOREIGN KEY (seller_id) REFERENCES employee(id) ON DELETE CASCADE ON UPDATE CASCADE
);

COMMIT;
