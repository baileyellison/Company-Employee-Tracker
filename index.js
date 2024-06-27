const inquirer = require('inquirer');
const connection = require('./db/connection'); 
const { 
    viewDepartments, 
    viewRoles, 
    viewEmployees, 
    addDepartment, 
    addRole, 
    addEmployee, 
    updateEmployeeRole, 
    updateEmployeeManager, 
    viewEmployeesByManager, 
    viewEmployeesByDepartment, 
    deleteDepartment, 
    deleteRole, 
    deleteEmployee, 
    calculateDepartmentBudget 
} = require('./db/queries');

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
                viewDepartments().then(() => startApp());
                break;
            case 'View all roles':
                viewRoles().then(() => startApp());
                break;
            case 'View all employees':
                viewEmployees().then(() => startApp());
                break;
            case 'Add a department':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter the name of the department:'
                    }
                ]).then(answer => {
                    addDepartment({ name: answer.name }).then(() => {
                        console.log(`Added department ${answer.name}`);
                        startApp();
                    }).catch(err => {
                        console.log(err);
                        startApp();
                    });
                });
                break;
            case 'Add a role':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter the title of the role:'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the salary for this role:',
                        validate: function(value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    },
                    {
                        type: 'input',
                        name: 'department_id',
                        message: 'Enter the department ID for this role:',
                        validate: function(value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    }
                ]).then(answers => {
                    addRole({
                        title: answers.title,
                        salary: answers.salary,
                        department_id: answers.department_id
                    }).then(() => {
                        console.log(`Added role ${answers.title}`);
                        startApp();
                    }).catch(err => {
                        console.log(err);
                        startApp();
                    });
                });
                break;
            case 'Add an employee':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'Enter the first name of the employee:'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'Enter the last name of the employee:'
                    },
                    {
                        type: 'input',
                        name: 'role_id',
                        message: 'Enter the role ID for this employee:',
                        validate: function(value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    },
                    {
                        type: 'input',
                        name: 'manager_id',
                        message: 'Enter the manager ID for this employee (optional - leave blank if none):',
                        filter: function(value) {
                            return value.trim() === '' ? null : Number(value); // Convert to null if empty
                        }
                    }
                ]).then(answers => {
                    addEmployee({
                        first_name: answers.first_name,
                        last_name: answers.last_name,
                        role_id: answers.role_id,
                        manager_id: answers.manager_id
                    }).then(() => {
                        console.log(`Added employee ${answers.first_name} ${answers.last_name}`);
                        startApp();
                    }).catch(err => {
                        console.log(err);
                        startApp();
                    });
                });
                break;
            case 'Update an employee role':
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
                        name: 'roleId',
                        message: 'Enter the ID of the new role:',
                        validate: function(value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    }
                ]).then(answers => {
                    updateEmployeeRole(answers.employeeId, answers.roleId).then(() => {
                        console.log(`Updated role for employee ${answers.employeeId}`);
                        startApp();
                    }).catch(err => {
                        console.log(err);
                        startApp();
                    });
                });
                break;
            case 'Update an employee manager':
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
                    }).catch(err => {
                        console.log(err);
                        startApp();
                    });
                });
                break;
            case 'View employees by manager':
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
                    viewEmployeesByManager(answer.managerId).then(() => startApp());
                });
                break;
            case 'View employees by department':
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
                    viewEmployeesByDepartment(answer.departmentId).then(() => startApp());
                });
                break;
            case 'Delete a department':
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
                    }).catch(err => {
                        console.log(err);
                        startApp();
                    });
                });
                break;
            case 'Delete a role':
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
                    }).catch(err => {
                        console.log(err);
                        startApp();
                    });
                });
                break;
            case 'Delete an employee':
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
                    }).catch(err => {
                        console.log(err);
                        startApp();
                    });
                });
                break;
            case 'Calculate department budget':
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
                    calculateDepartmentBudget(answer.departmentId).then(() => startApp());
                });
                break;
            case 'Exit':
                console.log('Exiting application...');
                connection.end(); // Ensure the MySQL connection is closed properly
                break;
            default:
                console.log('Invalid action');
                startApp();
                break;
        }
    }).catch(err => {
        console.log(err);
        startApp();
    });
}

startApp();
