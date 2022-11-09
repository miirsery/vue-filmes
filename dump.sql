--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12
-- Dumped by pg_dump version 12.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cinema; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cinema (
    id integer NOT NULL,
    title text,
    address text,
    location text,
    description text,
    phone text
);


--
-- Name: cinema_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cinema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cinema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cinema_id_seq OWNED BY public.cinema.id;


--
-- Name: cinema_image; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cinema_image (
    id integer NOT NULL,
    cinema_id integer NOT NULL,
    image text
);


--
-- Name: cinema_image_cinema_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cinema_image_cinema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cinema_image_cinema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cinema_image_cinema_id_seq OWNED BY public.cinema_image.cinema_id;


--
-- Name: cinema_image_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cinema_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cinema_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cinema_image_id_seq OWNED BY public.cinema_image.id;


--
-- Name: employee; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.employee (
    id integer NOT NULL,
    name text,
    surname text,
    patronymic text,
    "position" text DEFAULT 'cashier'::text NOT NULL,
    email text NOT NULL,
    login text NOT NULL,
    register_date timestamp without time zone DEFAULT now() NOT NULL,
    birthdate date,
    phone text,
    cinema_id integer NOT NULL,
    avatar text,
    password text NOT NULL
);


--
-- Name: employee_cinema_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.employee_cinema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: employee_cinema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.employee_cinema_id_seq OWNED BY public.employee.cinema_id;


--
-- Name: employee_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;


--
-- Name: hall; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hall (
    id integer NOT NULL,
    title integer NOT NULL,
    cinema_id integer NOT NULL,
    CONSTRAINT hall_title_check CHECK ((title > 0))
);


--
-- Name: hall_cinema_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hall_cinema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hall_cinema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hall_cinema_id_seq OWNED BY public.hall.cinema_id;


--
-- Name: hall_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hall_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hall_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hall_id_seq OWNED BY public.hall.id;


--
-- Name: hall_seat; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hall_seat (
    id integer NOT NULL,
    seat integer,
    x_position text,
    y_position text,
    available boolean,
    have boolean,
    hall_id integer
);


--
-- Name: hall_seat_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hall_seat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hall_seat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hall_seat_id_seq OWNED BY public.hall_seat.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: movie; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movie (
    id integer NOT NULL,
    title text NOT NULL,
    studio text,
    directors text,
    genre text,
    duration text,
    country text,
    description text,
    actors text,
    release_date date,
    age_restriction text,
    preview text,
    images text,
    movie_link text
);


--
-- Name: movie_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.movie_id_seq OWNED BY public.movie.id;


--
-- Name: person; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.person (
    id integer NOT NULL,
    name text,
    surname text,
    patronymic text,
    role text DEFAULT 'user'::text NOT NULL,
    email text NOT NULL,
    login text NOT NULL,
    register_date timestamp without time zone DEFAULT now() NOT NULL,
    birthdate date,
    discount integer DEFAULT 0,
    phone text,
    avatar text,
    password text NOT NULL,
    CONSTRAINT person_discount_check CHECK ((discount >= 0))
);


--
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    id integer NOT NULL,
    date date NOT NULL,
    "time" time without time zone,
    hall_id integer NOT NULL,
    movie_id integer NOT NULL
);


--
-- Name: session_hall_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_hall_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_hall_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_hall_id_seq OWNED BY public.session.hall_id;


--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;


--
-- Name: session_movie_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_movie_id_seq OWNED BY public.session.movie_id;


--
-- Name: ticket; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ticket (
    id integer NOT NULL,
    seat integer,
    price integer,
    buy_date timestamp without time zone DEFAULT now() NOT NULL,
    session_id integer NOT NULL,
    seller_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: ticket_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ticket_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ticket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ticket_id_seq OWNED BY public.ticket.id;


--
-- Name: ticket_seller_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ticket_seller_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ticket_seller_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ticket_seller_id_seq OWNED BY public.ticket.seller_id;


--
-- Name: ticket_session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ticket_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ticket_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ticket_session_id_seq OWNED BY public.ticket.session_id;


--
-- Name: ticket_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ticket_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ticket_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ticket_user_id_seq OWNED BY public.ticket.user_id;


--
-- Name: cinema id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cinema ALTER COLUMN id SET DEFAULT nextval('public.cinema_id_seq'::regclass);


--
-- Name: cinema_image id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cinema_image ALTER COLUMN id SET DEFAULT nextval('public.cinema_image_id_seq'::regclass);


--
-- Name: cinema_image cinema_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cinema_image ALTER COLUMN cinema_id SET DEFAULT nextval('public.cinema_image_cinema_id_seq'::regclass);


--
-- Name: employee id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);


--
-- Name: employee cinema_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employee ALTER COLUMN cinema_id SET DEFAULT nextval('public.employee_cinema_id_seq'::regclass);


--
-- Name: hall id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hall ALTER COLUMN id SET DEFAULT nextval('public.hall_id_seq'::regclass);


--
-- Name: hall cinema_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hall ALTER COLUMN cinema_id SET DEFAULT nextval('public.hall_cinema_id_seq'::regclass);


--
-- Name: hall_seat id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hall_seat ALTER COLUMN id SET DEFAULT nextval('public.hall_seat_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: movie id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie ALTER COLUMN id SET DEFAULT nextval('public.movie_id_seq'::regclass);


--
-- Name: person id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- Name: session id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);


--
-- Name: session hall_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session ALTER COLUMN hall_id SET DEFAULT nextval('public.session_hall_id_seq'::regclass);


--
-- Name: session movie_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session ALTER COLUMN movie_id SET DEFAULT nextval('public.session_movie_id_seq'::regclass);


--
-- Name: ticket id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ticket ALTER COLUMN id SET DEFAULT nextval('public.ticket_id_seq'::regclass);


--
-- Name: ticket session_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ticket ALTER COLUMN session_id SET DEFAULT nextval('public.ticket_session_id_seq'::regclass);


--
-- Name: ticket seller_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ticket ALTER COLUMN seller_id SET DEFAULT nextval('public.ticket_seller_id_seq'::regclass);


--
-- Name: ticket user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ticket ALTER COLUMN user_id SET DEFAULT nextval('public.ticket_user_id_seq'::regclass);


--
-- Data for Name: cinema; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cinema (id, title, address, location, description, phone) FROM stdin;
1	ByTowne Cinema	\N	\N	\N	\N
\.


--
-- Data for Name: cinema_image; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cinema_image (id, cinema_id, image) FROM stdin;
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.employee (id, name, surname, patronymic, "position", email, login, register_date, birthdate, phone, cinema_id, avatar, password) FROM stdin;
\.


--
-- Data for Name: hall; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.hall (id, title, cinema_id) FROM stdin;
1	1	1
2	2	1
\.


--
-- Data for Name: hall_seat; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.hall_seat (id, seat, x_position, y_position, available, have, hall_id) FROM stdin;
2	1	1	1	t	f	1
3	2	2	1	t	f	1
4	3	3	1	f	t	1
5	4	4	1	f	t	1
6	5	5	1	f	t	1
7	6	6	1	t	t	1
8	7	7	1	t	t	1
9	8	8	1	t	t	1
10	9	9	1	t	t	1
11	10	10	1	f	t	1
12	11	1	2	t	t	1
13	12	2	2	t	t	1
14	13	3	3	t	t	1
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, name, run_on) FROM stdin;
1	/20220929105015-initialize	2022-11-04 12:55:04.678
2	/20221015164456-insert-tables	2022-11-04 12:55:04.696
\.


--
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.movie (id, title, studio, directors, genre, duration, country, description, actors, release_date, age_restriction, preview, images, movie_link) FROM stdin;
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.person (id, name, surname, patronymic, role, email, login, register_date, birthdate, discount, phone, avatar, password) FROM stdin;
1	admin	admin	admin	admin	admin@admin.com	admin	2022-11-04 12:55:59.109969	2022-11-02	0	\N	\N	$2a$10$eKn8xgKl80lF86DenIf.uuLmt4y/A.4uFmg9IxhYnq4JD0Zkv.o5C
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session (id, date, "time", hall_id, movie_id) FROM stdin;
\.


--
-- Data for Name: ticket; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ticket (id, seat, price, buy_date, session_id, seller_id, user_id) FROM stdin;
\.


--
-- Name: cinema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cinema_id_seq', 1, false);


--
-- Name: cinema_image_cinema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cinema_image_cinema_id_seq', 1, false);


--
-- Name: cinema_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cinema_image_id_seq', 1, false);


--
-- Name: employee_cinema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.employee_cinema_id_seq', 1, false);


--
-- Name: employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.employee_id_seq', 1, false);


--
-- Name: hall_cinema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hall_cinema_id_seq', 1, false);


--
-- Name: hall_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hall_id_seq', 2, true);


--
-- Name: hall_seat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hall_seat_id_seq', 14, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 2, true);


--
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.movie_id_seq', 1, false);


--
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.person_id_seq', 1, true);


--
-- Name: session_hall_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.session_hall_id_seq', 1, false);


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.session_id_seq', 1, false);


--
-- Name: session_movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.session_movie_id_seq', 1, false);


--
-- Name: ticket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ticket_id_seq', 1, false);


--
-- Name: ticket_seller_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ticket_seller_id_seq', 1, false);


--
-- Name: ticket_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ticket_session_id_seq', 1, false);


--
-- Name: ticket_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ticket_user_id_seq', 1, false);


--
-- Name: cinema_image cinema_image_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cinema_image
    ADD CONSTRAINT cinema_image_pkey PRIMARY KEY (id);


--
-- Name: cinema cinema_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cinema
    ADD CONSTRAINT cinema_pkey PRIMARY KEY (id);


--
-- Name: employee employee_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_email_key UNIQUE (email);


--
-- Name: employee employee_login_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_login_key UNIQUE (login);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);


--
-- Name: hall hall_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hall
    ADD CONSTRAINT hall_pkey PRIMARY KEY (id);


--
-- Name: hall_seat hall_seat_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hall_seat
    ADD CONSTRAINT hall_seat_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: movie movie_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (id);


--
-- Name: person person_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_email_key UNIQUE (email);


--
-- Name: person person_login_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_login_key UNIQUE (login);


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: ticket ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_pkey PRIMARY KEY (id);


--
-- Name: cinema_image fk_cinema; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cinema_image
    ADD CONSTRAINT fk_cinema FOREIGN KEY (cinema_id) REFERENCES public.cinema(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employee fk_cinema; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT fk_cinema FOREIGN KEY (cinema_id) REFERENCES public.cinema(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hall fk_cinema; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hall
    ADD CONSTRAINT fk_cinema FOREIGN KEY (cinema_id) REFERENCES public.cinema(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hall_seat fk_hall; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hall_seat
    ADD CONSTRAINT fk_hall FOREIGN KEY (hall_id) REFERENCES public.hall(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: session fk_hall; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT fk_hall FOREIGN KEY (hall_id) REFERENCES public.hall(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: session fk_movie; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT fk_movie FOREIGN KEY (movie_id) REFERENCES public.movie(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ticket fk_seller; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ticket fk_session; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT fk_session FOREIGN KEY (session_id) REFERENCES public.session(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ticket fk_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.person(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

