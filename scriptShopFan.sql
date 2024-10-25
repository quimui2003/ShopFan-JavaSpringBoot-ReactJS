--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2024-10-25 15:17:09

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
-- TOC entry 220 (class 1259 OID 16416)
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    account_id integer NOT NULL,
    email character varying(255),
    password_hash character varying(255),
    role_id integer NOT NULL,
    customer_id integer NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16415)
-- Name: accounts_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.accounts_account_id_seq OWNER TO postgres;

--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 219
-- Name: accounts_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_account_id_seq OWNED BY public.accounts.account_id;


--
-- TOC entry 222 (class 1259 OID 16435)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    category_name character varying(255)
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16434)
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_category_id_seq OWNER TO postgres;

--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 221
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- TOC entry 218 (class 1259 OID 16407)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    customer_id integer NOT NULL,
    customer_name character varying(255),
    address character varying(255),
    phone_number character varying(255)
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16406)
-- Name: customers_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_customer_id_seq OWNER TO postgres;

--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 217
-- Name: customers_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;


--
-- TOC entry 232 (class 1259 OID 16501)
-- Name: ordercarts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ordercarts (
    cart_id integer NOT NULL,
    product_quantity integer,
    account_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.ordercarts OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16500)
-- Name: ordercarts_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ordercarts_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ordercarts_cart_id_seq OWNER TO postgres;

--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 231
-- Name: ordercarts_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ordercarts_cart_id_seq OWNED BY public.ordercarts.cart_id;


--
-- TOC entry 230 (class 1259 OID 16482)
-- Name: orderdetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orderdetails (
    detail_id integer NOT NULL,
    total_quantity integer,
    sale_price real,
    order_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.orderdetails OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16481)
-- Name: orderdetails_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orderdetails_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orderdetails_detail_id_seq OWNER TO postgres;

--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 229
-- Name: orderdetails_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orderdetails_detail_id_seq OWNED BY public.orderdetails.detail_id;


--
-- TOC entry 228 (class 1259 OID 16463)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    order_date timestamp(6) with time zone,
    total_price real,
    status_id integer NOT NULL,
    customer_id integer NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16462)
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO postgres;

--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 227
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- TOC entry 224 (class 1259 OID 16442)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name character varying(255),
    image_path character varying(255),
    inventory_quantity integer,
    original_price real,
    unit_price real,
    description character varying(255),
    update_time date,
    category_id integer NOT NULL,
    updated_time timestamp(6) with time zone
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16441)
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_product_id_seq OWNER TO postgres;

--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 223
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- TOC entry 216 (class 1259 OID 16400)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(255)
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_role_id_seq OWNER TO postgres;

--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 226 (class 1259 OID 16456)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    status_id integer NOT NULL,
    status_name character varying(255)
);


ALTER TABLE public.status OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16455)
-- Name: status_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.status_status_id_seq OWNER TO postgres;

--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 225
-- Name: status_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_status_id_seq OWNED BY public.status.status_id;


--
-- TOC entry 4730 (class 2604 OID 16419)
-- Name: accounts account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN account_id SET DEFAULT nextval('public.accounts_account_id_seq'::regclass);


--
-- TOC entry 4731 (class 2604 OID 16438)
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- TOC entry 4729 (class 2604 OID 16410)
-- Name: customers customer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);


--
-- TOC entry 4736 (class 2604 OID 16504)
-- Name: ordercarts cart_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordercarts ALTER COLUMN cart_id SET DEFAULT nextval('public.ordercarts_cart_id_seq'::regclass);


--
-- TOC entry 4735 (class 2604 OID 16485)
-- Name: orderdetails detail_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderdetails ALTER COLUMN detail_id SET DEFAULT nextval('public.orderdetails_detail_id_seq'::regclass);


--
-- TOC entry 4734 (class 2604 OID 16466)
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- TOC entry 4732 (class 2604 OID 16445)
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- TOC entry 4728 (class 2604 OID 16403)
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- TOC entry 4733 (class 2604 OID 16459)
-- Name: status status_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN status_id SET DEFAULT nextval('public.status_status_id_seq'::regclass);


--
-- TOC entry 4912 (class 0 OID 16416)
-- Dependencies: 220
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (account_id, email, password_hash, role_id, customer_id) FROM stdin;
2	nguyenvanquymui2003@gmail.com	12345	1	1
6	user@gmail.com	12345	3	7
\.


--
-- TOC entry 4914 (class 0 OID 16435)
-- Dependencies: 222
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (category_id, category_name) FROM stdin;
2	Quạt treo tuường
3	Quạt đứng
1	Quạt trần nhà
\.


--
-- TOC entry 4910 (class 0 OID 16407)
-- Dependencies: 218
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (customer_id, customer_name, address, phone_number) FROM stdin;
1	Quí Mùi	Đồng Tháp	0123456789
6	Nguyễn Văn Quí Mùi	Đồng Tháp	0966914131
7	Trần Công Dinh	Đồng Tháp	0123456789
3	Công Dinh	Dong Thap	0123456789
\.


--
-- TOC entry 4924 (class 0 OID 16501)
-- Dependencies: 232
-- Data for Name: ordercarts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ordercarts (cart_id, product_quantity, account_id, product_id) FROM stdin;
8	2	2	2
9	2	2	13
10	20	2	12
11	1	2	17
12	2	6	17
13	1	6	13
\.


--
-- TOC entry 4922 (class 0 OID 16482)
-- Dependencies: 230
-- Data for Name: orderdetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orderdetails (detail_id, total_quantity, sale_price, order_id, product_id) FROM stdin;
\.


--
-- TOC entry 4920 (class 0 OID 16463)
-- Dependencies: 228
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, order_date, total_price, status_id, customer_id) FROM stdin;
1	2024-10-06 02:40:30.648526+07	20.2	2	3
\.


--
-- TOC entry 4916 (class 0 OID 16442)
-- Dependencies: 224
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (product_id, product_name, image_path, inventory_quantity, original_price, unit_price, description, update_time, category_id, updated_time) FROM stdin;
17	quạt hộp	quathop.jpg	50	250000	260000	Quạt hộp nhỏ gọn	\N	1	2024-10-17 11:36:43.102373+07
2	Quạt treo tường 5 cánh	quattreotuong.jpg	11	210000	210000	Quạt treo tường phù hợp cho nhà tường	2024-09-28	2	2024-10-17 12:17:38.363932+07
15	Quạt quỳ	quatquy.jpg	40	200000	220000	Quạt quỳ thuận tiện	\N	2	2024-10-17 12:22:19.779574+07
12	Quạt phun sương	quatdungthap.jpg	30	800000	1e+06	Dùng công nghệ phun sương tự động	\N	1	2024-10-17 12:24:44.97907+07
3	Quạt đứng 3 cánh	quatmini.jpg	10	230000	230000	Quạt đứng phổ biến	2024-09-30	3	2024-10-17 12:26:12.292061+07
13	Quạt tay	quatsacdien.jpg	20	18000	20000	dùng tay để quạt	\N	2	2024-10-17 12:58:06.261186+07
18	Quạt phun sương	zalo.png	2	500000	510000	Dùng công nghệ phun sương tự động	\N	1	2024-10-17 13:38:39.775615+07
19	Quạt phun sương	protect.png	30	1.2e+06	1.22e+06	Dùng công nghệ phun sương tự động	\N	1	2024-10-17 13:48:13.421934+07
25	Quạt tay	quatquy.jpg	3	3	3	Quạt quỳ thuận tiện	\N	1	2024-10-20 16:12:45.993028+07
16	Quạt trần 5 cánh	\N	15	400000	450001	Quạt đứng phổ biến	\N	1	2024-10-20 16:19:34.377091+07
\.


--
-- TOC entry 4908 (class 0 OID 16400)
-- Dependencies: 216
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (role_id, role_name) FROM stdin;
1	Admin
3	User
\.


--
-- TOC entry 4918 (class 0 OID 16456)
-- Dependencies: 226
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (status_id, status_name) FROM stdin;
1	Chờ xử lý!
2	Đã duyệt!
3	Bị từ chối!
\.


--
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 219
-- Name: accounts_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_account_id_seq', 6, true);


--
-- TOC entry 4940 (class 0 OID 0)
-- Dependencies: 221
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_category_id_seq', 4, true);


--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 217
-- Name: customers_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_customer_id_seq', 7, true);


--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 231
-- Name: ordercarts_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ordercarts_cart_id_seq', 13, true);


--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 229
-- Name: orderdetails_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orderdetails_detail_id_seq', 2, true);


--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 227
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 2, true);


--
-- TOC entry 4945 (class 0 OID 0)
-- Dependencies: 223
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_product_id_seq', 25, true);


--
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 4, true);


--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 225
-- Name: status_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_status_id_seq', 4, true);


--
-- TOC entry 4742 (class 2606 OID 16423)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (account_id);


--
-- TOC entry 4744 (class 2606 OID 16440)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- TOC entry 4740 (class 2606 OID 16414)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);


--
-- TOC entry 4754 (class 2606 OID 16506)
-- Name: ordercarts ordercarts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordercarts
    ADD CONSTRAINT ordercarts_pkey PRIMARY KEY (cart_id);


--
-- TOC entry 4752 (class 2606 OID 16489)
-- Name: orderdetails orderdetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_pkey PRIMARY KEY (detail_id);


--
-- TOC entry 4750 (class 2606 OID 16470)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- TOC entry 4746 (class 2606 OID 16449)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- TOC entry 4738 (class 2606 OID 16405)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 4748 (class 2606 OID 16461)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (status_id);


--
-- TOC entry 4755 (class 2606 OID 16429)
-- Name: accounts accounts_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);


--
-- TOC entry 4756 (class 2606 OID 16424)
-- Name: accounts accounts_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- TOC entry 4762 (class 2606 OID 16507)
-- Name: ordercarts ordercarts_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordercarts
    ADD CONSTRAINT ordercarts_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.accounts(account_id);


--
-- TOC entry 4763 (class 2606 OID 16512)
-- Name: ordercarts ordercarts_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordercarts
    ADD CONSTRAINT ordercarts_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- TOC entry 4760 (class 2606 OID 16490)
-- Name: orderdetails orderdetails_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- TOC entry 4761 (class 2606 OID 16495)
-- Name: orderdetails orderdetails_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- TOC entry 4758 (class 2606 OID 16476)
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);


--
-- TOC entry 4759 (class 2606 OID 16471)
-- Name: orders orders_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.status(status_id);


--
-- TOC entry 4757 (class 2606 OID 16450)
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id);


-- Completed on 2024-10-25 15:17:09

--
-- PostgreSQL database dump complete
--

