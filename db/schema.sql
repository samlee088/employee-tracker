DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;


use employee_db;


CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL,
    PRIMARY KEY (ID)

);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
    FOREIGN KEY (role_id),
    REFERENCES role(id),
    ON DELETE SET NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id),
    ON DELETE SET NULL
);






