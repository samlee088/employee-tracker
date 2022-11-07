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


/* These grouping of functions are to run queries for data retrieval  */

 async function queryAllDepartments(init) {
    try {
        const returnData = await db.promise().query('Select name,id FROM department ORDER BY id')
    
        console.table(returnData[0]);
        init();
    }

    catch(err) {
        console.error("Error with query all departments");
        init();
    }
};

async function queryAllRoles(init) {
    try {
        const returnAllRoles = await db.promise().query('Select r.id, r.title, r.salary, r.department_id, d.name AS department_name FROM role r JOIN department d ON r.department_id = d.id ORDER BY id')

        console.table(returnAllRoles[0]);
        init();
    }

    catch(err) {
        console.error("Error with Query All Roles");
        init();
    }
};

async function queryAllEmployees(init) {
    try {
        const QueryAllEmployeesResults = await db.promise().query('SELECT e.id, e.first_name, e.last_name, r.title, r.salary, e.manager_id, d.name as Department FROM employee e JOIN role r ON r.id = e.role_id JOIN department d ON d.id = r.department_id ORDER BY e.id');

        console.table(QueryAllEmployeesResults[0]);
        init();
    }

    catch(err) {
        console.error("Error with QueryAllEmployeesResults");
        init();
    }
};


/* These are the grouping of functions of queries that are to add or modify data*/

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
};

async function addRole(roleName, roleSalary, roleDepartment, init) {
    try{
        await db.promise().query(`INSERT INTO role (title,salary, department_id) VALUES (?,?,?)`, [roleName,roleSalary,roleDepartment])

        const newRoleResults = await db.promise().query('SELECT r.id, r.title, r.salary, d.name FROM role r JOIN department d ON r.department_id = d.id ORDER BY id')

        console.table(newRoleResults[0]);
        init();
    }

    catch(err) {
        console.error("Error with new role entry");
        init();
    }

};

async function addEmployee(first_name, last_name, employee_role, employeeManager,init) {
    try{
        await db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [first_name, last_name, employee_role, employeeManager])

        const newEmployeeResults = await db.promise().query('SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id, r.title FROM employee e JOIN role r ON e.role_id = r.id ORDER BY id')

        console.table(newEmployeeResults[0]);
        init()
        
    }   
        
    catch(err) {
        console.error("Error with adding in Employee1");
        init();
    }
};


async function addEmployeeAsManager(first_name, last_name, employee_role ,init) {
    try{
            await db.promise().query('INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES (?,?,?,?)', (first_name, last_name, employee_role, NULL))

            const newEmployeeResults = await db.promise().query('SELECT * FROM employee ORDER BY id')
    
            console.table(newEmployeeResults[0]);
            init()


        
    }   
        
    catch(err) {
        console.error("Error with adding in Employee2");
        init();
    }
};


async function changeRole(employee, newRole, init) {
    try{
        console.log(employee, newRole);
        await db.promise().query('UPDATE employee SET role_id = (?) WHERE id =(?)', [newRole,employee])

        const updateEmployeeResults = await db.promise().query('SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id, r.title FROM employee e JOIN role r ON e.role_id = r.id ORDER BY id')

        console.table(updateEmployeeResults[0])
        init();
    }

    catch(err) {
        console.error("Error with updating role");
        init();
    }
};


async function changeManager(employee, newManager, init) {
    try{
        await db.promise().query('UPDATE employee SET manager_id = (?) WHERE id =(?)', [newManager,employee])
        const updateManagerResults = await db.promise().query('SELECT * FROM employee ORDER BY id')

        console.table(updateManagerResults[0])
        init();
    }

    catch(err) {
        console.error("Error with updating manager");
        init();
    }
};


/* This grouping of functions are to run queries that will output data based on a selection criteria */
async function viewSubordinates(data,init) {
    try{
        const viewSubordinatesResults = await db.promise().query(`SELECT id,first_name, last_name FROM employee WHERE manager_id =?`, data.Manager)

        console.table(viewSubordinatesResults[0]);
        init();
    }

    catch(err) {
        console.error("Error with viewing subordinates");
        init();
    }
};

async function viewDepartmentEmployees(departmentData, init) {
    try {
        const employeeSelectionResults = await db.promise().query('SELECT d.name, e.id, e.first_name, e.last_name FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id WHERE d.id =?' , departmentData.roleDepartment)

        console.table(employeeSelectionResults[0])
        init();
    }

    catch (err) {
        console.error("Error with employee retrieval by department");
        init();
    }
};



/* This grouping of functions are queries to delete data  */
async function deleteDepartment(department, init) {
    try {
        console.log(department);
        await db.promise().query('DELETE FROM department WHERE id =?', department.roleDepartment );

        const newDepartmentSet = await db.promise().query('SELECT * FROM department ORDER BY id');

        console.table(newDepartmentSet[0]);
        init();
    }

    catch(err) {
        console.info("Error with department delete");
        init();
    }
};

async function deleteRole(role, init){
    try{
        await db.promise().query('DELETE FROM role WHERE id =?', role.employee_role);

        const newRoleSet = await db.promise().query('SELECT * FROM role');

        console.table(newRoleSet[0]);
        init();
    }

    catch(err) {
        console.error("Error with role delete");
    }
};

async function deleteEmployee(employee, init) {
    try{
        await db.promise().query('DELETE FROM employee WHERE id=?',employee.employee);

        const newEmployeeSet = await db.promise().query('SELECT * FROM employee');

        console.table(newEmployeeSet[0]);
        init();
    }

    catch(err) {
        console.error("Error with employee delete");
        init();
    }
};


/* This is function that will return the combined salaries of all employees for the selected department */
async function departmentBudget(department, init) {
    try{
        const budgetTotal = await db.promise().query('SELECT SUM(r.salary) AS total_department_payroll FROM employee e LEFT JOIN role r ON e.role_id=r.id LEFT JOIN department d ON r.department_id = d.id  WHERE department_id =?', department.roleDepartment);

        console.table(budgetTotal[0]);
        init();
    }

    catch(err) {
        console.error("Error with department budget query");
        init();
    }
};


/* This grouping of functions are queries to dynamically return list data for inquirer prompts */
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
};

async function managersListWithNull() {
    try{
        const managersListResults = await db.promise().query('SELECT first_name as name, id as value FROM employee ORDER BY id')

        return managersListResults[0].concat('NULL');
    }

    catch(err) {
        console.error("Error with grabbing manager list");
    }
};

async function managersList() {
    try{
        const managersListResults = await db.promise().query('SELECT first_name as name, id as value FROM employee ORDER BY id')
     
        return managersListResults[0];
    }

    catch(err) {
        console.error("Error with grabbing manager list");
    }
};


async function employeesList() {
    try{
        const employeesListArray = await db.promise().query('SELECT first_name as name, id as value FROM employee ORDER BY id')

        return (employeesListArray[0]);
    }

    catch(err) {
        console.error("Error with full employee list");
    }
};



module.exports = {
    queryAllDepartments,
    queryAllRoles,
    queryAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    addEmployeeAsManager,
    changeRole,
    departmentsList,
    managersList,
    managersListWithNull,
    rolesList,
    employeesList,
    changeManager,
    viewSubordinates,
    departmentsList,
    viewDepartmentEmployees,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    departmentBudget,

}