INSERT INTO department (name)
VALUES  ("Mathematics"),
        ("Science");



INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Manager", 1.00,1),
        (2, "Hourly",.50,2);


INSERT INTO employee (id, first_name, last_name, role_id,manager_id)
VALUES  (1, "John", "Doe", 1 ,null ),
        (2, "James","Bond", 2, 1)





