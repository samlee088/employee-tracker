INSERT INTO department (name)
VALUES  ("Accounting"),
        ("Sales"),
        ("Customer Service"),
        ("Quality Control"),
        ("Assistant to CEO"),
        ("CEO");




INSERT INTO role (title, salary, department_id)
VALUES  ("Accountant Lead", 110000, 1),
        ("Accountant", 70000, 1),
        ("Sales", 120000, 2),
        ("Customer Service ", 75000, 3 ),
        ("Quality Control", 75000, 4),
        ("Assistant to the CEO", 120000,5),
        ("CEO", 350000,6);


 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Micahel", "Scott", 7, null),
        (2, "Angela", "Martin", 1 , 1 ),
        (3, "Kevin","Malone", 2, 2),
        (4, "Jim", "Halpert", 3, 1),
        (5, "Andy", "Benard", 3, 4),
        (6, "Karen","Filippelli", 3, 4),
        (7, "Kelly", "Kapoor", 4, 1),
        (8, "Creed", "Bratton", 5, 3),
        (9, "Dwight", "Schrute", 6, 4);
       
        




