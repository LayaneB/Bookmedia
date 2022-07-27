CREATE TABLE data_cubos_test (
	id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    participation INT NOT NULL,
    check(participation > 0 AND participation < 101)
);