const connection = require('./connection');

// View all departments
function viewDepartments() {
    return connection.execute('SELECT * FROM department').then(([rows, fields]) => {
        console.table(rows);
    });
}

// Add a department
function addDepartment(department) {
    return connection.execute(
        'INSERT INTO department (name) VALUES (?)',
        [department.name]
    );
}

// Update employee manager
function updateEmployeeManager(employeeId, managerId) {
    return connection.execute(
        'UPDATE employee SET manager_id = ? WHERE id = ?',
        [managerId, employeeId]
    );
}

// View all employees
function viewEmployees() {
    return connection.execute('SELECT * FROM employee').then(([rows, fields]) => {
        console.table(rows);
        return rows; // Can return rows if needed elsewhere
    });
}

// Add a role
function addRole(role) {
    return connection.execute(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [role.title, role.salary, role.department_id]
    );
}

// Add an employee
function addEmployee(employee) {
    return connection.execute(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]
    );
}

// Update an employee role
function updateEmployeeRole(employeeId, roleId) {
    return connection.execute(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [roleId, employeeId]
    );
}

// View employees by manager
function viewEmployeesByManager(managerId) {
    return connection.execute(
        'SELECT * FROM employee WHERE manager_id = ?',
        [managerId]
    ).then(([rows, fields]) => {
        console.table(rows);
        // Do not call startApp() here as it's intended to be called from index.js
    });
}

// View employees by department
function viewEmployeesByDepartment(departmentId) {
    return connection.execute(
        'SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary ' +
        'FROM employee e ' +
        'INNER JOIN role r ON e.role_id = r.id ' +
        'INNER JOIN department d ON r.department_id = d.id ' +
        'WHERE r.department_id = ?',
        [departmentId]
    ).then(([rows, fields]) => {
        console.table(rows);
        // Do not call startApp() here as it's intended to be called from index.js
    });
}

// View all roles
function viewRoles() {
    return connection.execute('SELECT * FROM role').then(([rows, fields]) => {
        console.table(rows);
        return rows; // Optionally, you can return rows if needed elsewhere
    });
}

// Delete department by ID
function deleteDepartment(departmentId) {
    return connection.execute(
        'DELETE FROM department WHERE id = ?',
        [departmentId]
    );
}

// Delete role by ID
function deleteRole(roleId) {
    return connection.execute(
        'DELETE FROM role WHERE id = ?',
        [roleId]
    );
}

// Delete employee by ID
function deleteEmployee(employeeId) {
    return connection.execute(
        'DELETE FROM employee WHERE id = ?',
        [employeeId]
    );
}

// Calculate total utilized budget of a department
function calculateDepartmentBudget(departmentId) {
    return connection.execute(
        'SELECT SUM(r.salary) AS total_budget ' +
        'FROM employee e ' +
        'INNER JOIN role r ON e.role_id = r.id ' +
        'WHERE r.department_id = ?',
        [departmentId]
    ).then(([rows, fields]) => {
        console.log(`Total Budget for Department ${departmentId}: $${rows[0].total_budget}`);
        // Do not call startApp() here as it's intended to be called from index.js
    });
}

module.exports = {
    viewDepartments,
    addDepartment,
    updateEmployeeManager,
    viewEmployees,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    viewRoles,
    addRole,
    addEmployee,
    updateEmployeeRole,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    calculateDepartmentBudget
};
