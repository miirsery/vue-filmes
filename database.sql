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

CREATE TABLE posts
(
      id                SERIAL PRIMARY KEY NOT NULL,
      person_id         INT REFERENCES person (id),
      created_at        TEXT NOT NULL,
      updated_at        TEXT,
      title             TEXT NOT NULL,
      content           TEXT
);

CREATE TABLE user_images
(
    id                  SERIAL PRIMARY KEY,
    person_id           INT REFERENCES person (id),
    path                TEXT
);

CREATE TABLE user_favorite_images
(
    user_image          INT REFERENCES user_image(id),
    person_id           INT REFERENCES person(id)
);

CREATE TABLE cinemas
(
    id                  SERIAL PRIMARY KEY NOT NULL,
    title               TEXT NOT NULL,
    address             TEXT NOT NULL,
    position            TEXT
);
