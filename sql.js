const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password: 'password',
        database:'employee_db'
    },

console.log('Connected to the employee_db database.')
);

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
 async function queryAllDepartments(init) {
    try {
        const returnData = await db.promise().query('Select name,id as value FROM department ORDER BY id')
    
        console.table(returnData[0]);
        init();
    }
    catch(err) {
        console.error("Error with query all departments");
        init();
    }
};


// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

async function queryAllRoles(init) {
    try {
        const returnAllRoles = await db.promise().query('Select * FROM role ORDER BY id')

        console.table(returnAllRoles[0]);
        init();
    }

    catch(err) {
        console.error("Error with Query All Roles");
        init();
    }

}



// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

async function queryAllEmployees(init) {
    try {
        const QueryAllEmployeesResults = await db.promise().query('SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name FROM employee AS e JOIN role AS r ON r.id = e.role_id JOIN department d ON d.id = r.department_id');

        console.table(QueryAllEmployeesResults[0]);
        init();
    }

    catch(err) {
        console.error("Error with QueryAllEmployeesResults");
        init();
    }
}




// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

async function addDepartment(data,init) {
    try{
        await db.promise().query(`INSERT INTO department (name) Values (?)`, data )
        const addDepartmentResults = await db.promise().query('SELECT * FROM department')

        console.table(addDepartmentResults[0]);
        init();
    }

    catch(err) {
        console.error("Error with addDepartment");
        init();
    }
}
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

async function addRole(roleName, roleSalary, roleDepartment, init) {

    try{
       
        await db.promise().query(`INSERT INTO role (title,salary, department_id) VALUES (?,?,?)`, [roleName,roleSalary,roleDepartment])

        const newRoleResults = await db.promise().query('SELECT * FROM role ORDER BY id')

        console.table(newRoleResults[0]);
        init();
       
    }

    catch(err) {
        console.error("Error with new role entry");
        init();
    }


    
    
   
}


// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

async function addEmployee(first_name, last_name, employee_role, employeeManager,init) {
    try{
        console.info(first_name, last_name, employee_role, employeeManager)
        await db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [first_name, last_name, employee_role, employeeManager])

        const newEmployeeResults = await db.promise().query('SELECT * FROM employee ORDER BY id')

        console.table(newEmployeeResults[0]);
        init()

        }
        
    catch(err) {
        console.error("Error with adding in Employee");
        init();
    }
}





// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

async function changeRole(employee, newRole, init) {
    
    try{
        await db.promise().query('UPDATE employee SET role_id = (?) WHERE id =(?)', [newRole,employee])
        const updateEmployeeResults = await db.promise().query('SELECT * FROM employee ORDER BY id')

        console.table(updateEmployeeResults[0])
        init();
       
    }

    catch(err) {
        console.error("Error with updating role");
        init();
    }
}


async function departmentsList() {
    try {
        const departmentsListResults = await db.promise().query('Select name,id as value FROM department ORDER BY id')
        
        return departmentsListResults[0];
    }
    
    catch(err) {
        console.error("Error with department list grab");
    }
};


async function rolesList() {
    try{
        const rolesListResults = await db.promise().query('SELECT title as name, id as value FROM role ORDER BY id');
        
        return rolesListResults[0];
    }

    catch(err) {
        console.error("Error with grabbing roles list");
    }

}
async function managersList() {
    try{
        const managersListResults = await db.promise().query('SELECT first_name as name, id as value FROM employee ORDER BY id')

        return managersListResults[0];

    }

    catch(err) {
        console.error("Error with grabbing manager list");
    }
}

async function employeesList() {
    try{
        const employeesListArray = await db.promise().query('SELECT first_name as name, id as value FROM employee ORDER BY id')

        return (employeesListArray[0]);
    }

    catch(err) {
        console.error("Error with full employee list");
    }
}


module.exports = {
    queryAllDepartments,
    queryAllRoles,
    queryAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    changeRole,
    departmentsList,
    managersList,
    rolesList,
    employeesList

}