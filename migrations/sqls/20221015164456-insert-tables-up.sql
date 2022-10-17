/* Replace with your SQL commands */

BEGIN;

INSERT INTO cinema
(
    title,
    address,
    location,
    phone
) VALUES
	('The best cinema#1', 'The best street#1', '43.44, -79.69', '8800353535'),
    ('The best cinema#2', 'The best street#1', '43.44, -79.69', '8800353535');

INSERT INTO movie
(
    title,
    studio,
    genre,
    release_date,
    description,
    preview
) VALUES
      ('The best movie#1', 'The best studio#1', 'Horror', '1998-02-02', 'The best description#1', ''),
      ('The best movie#2', 'The best studio#1', 'Horror', '1991-11-13', 'The best description#2', ''),
      ('The best movie#3', 'The best studio#2', 'Comedy', '1998-03-24',  'The best description#3', ''),
      ('The best movie#4', 'The best studio#3', 'Comedy', '1944-03-14',  '', '');

INSERT INTO person
(
    surname,
    name,
    patronymic,
    birthdate,
    role,
    email,
    login,
    password,
    avatar
) VALUES
      ('The best surname#1', 'The best name#1', 'The best patronymic#1', '1999-06-12', 'user', 'email@mail.ru', 'login', 'password', ''),
      ('The best surname#2', 'The best name#2', 'The best patronymic#2', '2001-02-01', 'user', 'email1@mail.ru', 'login1', 'password', ''),
      ('The best surname#3', 'The best name#3', 'The best patronymic#3', '2006-02-02', 'user', 'email2@mail.ru', 'login2', 'password', ''),
      ('The best surname#4', 'The best name#4', 'The best patronymic#4', '1991-06-12', 'user', 'email3@mail.ru', 'login3', 'password', '');

INSERT INTO hall
(
    title,
    seats_count,
    cinema_id
) VALUES
	(0, 30, 1),
	(1, 40, 1),
    (2, 80, 1),
    (0, 10, 2),
    (1, 15, 2),
    (2, 20, 2);

INSERT INTO session
(
    date,
    time,
    hall_id,
    movie_id
) VALUES
	('2022-09-11', '11:35:00', 1, 1),
	('2022-09-12', '11:15:00', 2, 1),
	('2022-10-13', '11:25:00', 1, 1),
	('2022-01-14', '23:35:00', 2, 2),
	('2022-02-15', '21:35:00', 1, 3),
	('2022-09-16', '10:35:00', 2, 2),
	('2022-11-17', '09:35:00', 1, 3),
	('2022-12-18', '01:25:00', 2, 1);

INSERT INTO employee
(
    surname,
    name,
    patronymic,
    birthdate,
	cinema_id,
	rate,
    position
) VALUES
	('The best surname#5', 'The best name#4', 'The best patronymic#5', '1991-06-12', 1, 1, 'cashier'),
	('The best surname#6', 'The best name#5', 'The best patronymic#6', '1992-09-12', 2, 1, 'cashier'),
	('The best surname#7', 'The best name#6', 'The best patronymic#7', '1993-08-12', 2, 1, 'cashier'),
	('The best surname#8', 'The best name#7', 'The best patronymic#8', '1994-07-12', 1, 0.5, 'cashier');

INSERT INTO ticket
(
    session_id,
    seat,
    user_id,
    price,
    seller_id,
    movie_id
) VALUES
    (1, 1, 1, 250, 1, 1),
    (1, 3, 2, 250, 2, 2),
    (1, 5, 3, 250, 3, 3),
    (1, 7, 4, 250, 4, 4),
    (2, 1, 1, 350, 1, 1),
    (2, 2, 2, 350, 2, 2),
    (2, 3, 3, 350, 3, 3),
    (2, 4, 4, 350, 4, 4),
    (3, 10, 1, 350, 1, 1),
    (3, 11, 2, 350, 2, 2),
    (3, 12, 3, 350, 3, 3),
    (3, 13, 4, 350, 4, 4),
    (4, 23, 1, 5000, 1, 1),
    (4, 22, 2, 5000, 2, 2),
    (4, 21, 3, 5000, 3, 3),
    (5, 20, 4, 5000, 4, 4);

COMMIT;