-- Insert departments
INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Marketing');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
    ('Software Engineer', 80000.00, 1),
    ('Sales Manager', 100000.00, 2),
    ('Marketing Specialist', 75000.00, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Kim', 'Kardashian', 1, NULL),
    ('John', 'Lennon', 2, NULL),
    ('Michael', 'Jordan', 3, 2);
