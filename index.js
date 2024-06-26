const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment, deleteDepartment, deleteRole, deleteEmployee, calculateDepartmentBudget } = require('./db/queries');

function startApp() {
    // Display initial prompt to the user
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee manager',
                'View employees by manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Calculate department budget',
                'Exit'
            ]
        }
    ]).then(answer => {
        switch (answer.action) {
            case 'View all departments':
                viewDepartments().then(startApp);
                break;
            case 'View all roles':
                viewRoles().then(startApp);
                break;
            case 'View all employees':
                viewEmployees().then(startApp);
                break;
            case 'Add a department':
                addDepartment().then(startApp);
                break;
            case 'Add a role':
                addRole().then(startApp);
                break;
            case 'Add an employee':
                addEmployee().then(startApp);
                break;
            case 'Update an employee role':
                updateEmployeeRole().then(startApp);
                break;
            case 'Update an employee manager':
                // Prompt for employee ID and new manager ID
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'employeeId',
                        message: 'Enter the ID of the employee you want to update:',
                        validate: function(value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    },
                    {
                        type: 'input',
                        name: 'managerId',
                        message: 'Enter the ID of the new manager:',
                        validate: function(value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    }
                ]).then(answers => {
                    updateEmployeeManager(answers.employeeId, answers.managerId).then(() => {
                        console.log(`Updated manager for employee ${answers.employeeId}`);
                        startApp();
                    });
                });
                break;
            case 'View employees by manager':
                // Prompt for manager ID
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'managerId',
                        message: 'Enter the ID of the manager to view employees:',
                        validate: function(value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    }
                ]).then(answer => {
                    viewEmployeesByManager(answer.managerId).then(startApp);
                });
                break;
            case 'View employees by department':
                // Prompt for department ID
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'departmentId',
                        message: 'Enter the ID of the department to view employees:',
                        validate: function(value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    }
                ]).then(answer => {
                    viewEmployeesByDepartment(answer.departmentId).then(startApp);
                });
                break;
            case 'Delete a department':
                // Prompt for department ID to delete
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'departmentId',
                        message: 'Enter the ID of the department you want to delete:',
                        validate: function(value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    }
                ]).then(answer => {
                    deleteDepartment(answer.departmentId).then(() => {
                        console.log(`Deleted department with ID ${answer.departmentId}`);
                        startApp();
                    });
                });
                break;
            case 'Delete a role':
                // Prompt for role ID to delete
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'roleId',
                        message: 'Enter the ID of the role you want to delete:',
                        validate: function(value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    }
                ]).then(answer => {
                    deleteRole(answer.roleId).then(() => {
                        console.log(`Deleted role with ID ${answer.roleId}`);
                        startApp();
                    });
                });
                break;
            case 'Delete an employee':
                // Prompt for employee ID to delete
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'employeeId',
                        message: 'Enter the ID of the employee you want to delete:',
                        validate: function(value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    }
                ]).then(answer => {
                    deleteEmployee(answer.employeeId).then(() => {
                        console.log(`Deleted employee with ID ${answer.employeeId}`);
                        startApp();
                    });
                });
                break;
            case 'Calculate department budget':
                // Prompt for department ID to calculate budget
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'departmentId',
                        message: 'Enter the ID of the department to calculate budget:',
                        validate: function(value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    }
                ]).then(answer => {
                    calculateDepartmentBudget(answer.departmentId).then(startApp);
                });
                break;
            case 'Exit':
                console.log('Exiting application...');
                connection.end();
                break;
        }
    });
}

startApp();
