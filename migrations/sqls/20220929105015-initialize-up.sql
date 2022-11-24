/* Replace with your SQL commands */
BEGIN;

CREATE TABLE IF NOT EXISTS person
(
    id                SERIAL PRIMARY KEY NOT NULL,
    name              TEXT,
    surname           TEXT,
    patronymic        TEXT,
    role              TEXT NOT NULL DEFAULT 'user',
    email             TEXT UNIQUE NOT NULL,
    login             TEXT UNIQUE NOT NULL,
    register_date     TIMESTAMP NOT NULL DEFAULT NOW(),
    birthdate         DATE,
    discount          INT DEFAULT 0 CHECK ( discount >= 0 ),
    phone             TEXT,
    avatar            TEXT,
    password          TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cinema
(
    id              SERIAL PRIMARY KEY NOT NULL,
    title           TEXT,
    address         TEXT,
    lng             FLOAT(6),
    lat             FLOAT(6),
    description     TEXT,
    phone           TEXT,
    preview         TEXT
);

CREATE TABLE IF NOT EXISTS cinema_image
(
    id              SERIAL PRIMARY KEY NOT NULL,
    cinema_id		INT,
    image           TEXT,

    CONSTRAINT      fk_cinema  FOREIGN KEY(cinema_id) REFERENCES cinema(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS cinema_favorite
(
    id              SERIAL PRIMARY KEY NOT NULL,
    user_id         INT,
    cinema_id       INT,

    CONSTRAINT      fk_cinema  FOREIGN KEY(cinema_id) REFERENCES cinema(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT      fk_user  FOREIGN KEY(user_id) REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS movie
(
    id                  SERIAL PRIMARY KEY NOT NULL,
    title               TEXT NOT NULL,
    studio              TEXT,
    directors           TEXT,
    genre               TEXT,
    duration            TEXT,
    country             TEXT,
    description         TEXT,
    actors              TEXT,
    release_date        DATE,
    age_restriction     TEXT,
    preview             TEXT,
    images              TEXT,
    movie_link          TEXT
);

CREATE TABLE IF NOT EXISTS movie_visit
(
    id                  SERIAL PRIMARY KEY NOT NULL,
    user_id             INT,
    movie_id            INT,

    CONSTRAINT      fk_movie  FOREIGN KEY(movie_id) REFERENCES movie(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT      fk_user  FOREIGN KEY(user_id) REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS employee
(
    id              SERIAL PRIMARY KEY NOT NULL,
    name			TEXT,
    surname		    TEXT,
    patronymic	    TEXT,
    position		TEXT NOT NULL DEFAULT 'cashier',
    email           TEXT UNIQUE NOT NULL,
    login           TEXT UNIQUE NOT NULL,
    register_date   TIMESTAMP NOT NULL DEFAULT NOW(),
    birthdate	    DATE,
    phone           TEXT,
    cinema_id		INT,
    avatar          TEXT,
    password        TEXT NOT NULL,

    CONSTRAINT      fk_cinema  FOREIGN KEY(cinema_id) REFERENCES cinema(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS hall
(
    id                  SERIAL PRIMARY KEY NOT NULL,
    title               INT NOT NULL CHECK ( title > 0 ),
    cinema_id           INT,

    CONSTRAINT          fk_cinema  FOREIGN KEY(cinema_id) REFERENCES cinema(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS session
(
    id              SERIAL PRIMARY KEY NOT NULL,
    date            DATE NOT NULL,
    time            TIME,
    price           INT NOT NULL DEFAULT 0,
    hall_id         INT,
    movie_id        INT,

    CONSTRAINT      fk_hall FOREIGN KEY(hall_id) REFERENCES hall(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT      fk_movie FOREIGN KEY(movie_id) REFERENCES movie(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS hall_seat
(
    id                  SERIAL PRIMARY KEY NOT NULL,
    seat                INT,
    x_position          INT,
    y_position          INT,
    available           BOOLEAN,
    hall_id             INT,
    session_id          INT,
    user_id             INT,

    CONSTRAINT          fk_hall  FOREIGN KEY(hall_id) REFERENCES hall(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT          fk_session  FOREIGN KEY(session_id) REFERENCES session(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT          fk_user_id FOREIGN KEY(user_id) REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ticket
(
    id              SERIAL PRIMARY KEY NOT NULL,
    seat			INT,
    price			INT,
    buy_date		TIMESTAMP NOT NULL DEFAULT now(),
    session_id		INT,
    seller_id		INT,
    user_id		    INT,

    CONSTRAINT      fk_session FOREIGN KEY (session_id) REFERENCES session(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT      fk_user FOREIGN KEY (user_id) REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT      fk_seller FOREIGN KEY (seller_id) REFERENCES employee(id) ON DELETE CASCADE ON UPDATE CASCADE
);

COMMIT;
