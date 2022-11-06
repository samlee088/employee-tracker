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
        const returnData = await db.promise().query('Select name,id FROM department ORDER BY id')
    
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
        const QueryAllEmployeesResults = await db.promise().query('SELECT e.id, e.first_name, e.last_name, r.title, r.salary, e.manager_id, d.name as Department FROM employee e JOIN role r ON r.id = e.role_id JOIN department d ON d.id = r.department_id');

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
        console.info(data);
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

        const newRoleResults = await db.promise().query('SELECT r.id, r.title, r.salary, d.name FROM role r JOIN department d ON r.department_id = d.id ORDER BY id')

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
        const updateEmployeeResults = await db.promise().query('SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id, r.title FROM employee e JOIN role r ON e.role_id = r.id ORDER BY id')

        console.table(updateEmployeeResults[0])
        init();
       
    }

    catch(err) {
        console.error("Error with updating role");
        init();
    }
}


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
}

async function viewSubordinates(data,init) {
    try{

        console.log(data);
        const viewSubordinatesResults = await db.promise().query(`SELECT id,first_name, last_name FROM employee WHERE manager_id =?`, data.Manager)

        console.table(viewSubordinatesResults[0]);
        init();
    }

    catch(err) {
        console.error("Error with viewing subordinates");
        init();
    }

}

async function viewDepartmentEmployees(departmentData, init) {

    try {
        console.log(departmentData);
        const employeeSelectionResults = await db.promise().query('SELECT d.name, e.id, e.first_name, e.last_name FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id WHERE d.id =?' , departmentData.department)

        console.table(employeeSelectionResults[0])
        init();



    }

    catch (err) {
        console.error("Error with employee retrieval by department");
        init();
    }


}




async function deleteDepartment(department, init) {
    try {
        console.log(department);
        await db.promise().query('DELETE FROM department WHERE id =?',department.roleDepartment );

        const newDepartmentSet = await db.promise().query('SELECT * FROM department ORDER BY id');

        console.table(newDepartmentSet[0]);
        init();


    }

    catch(err) {
        console.info("Error with employee delete");
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

async function managersUpdateList() {
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

// async function departmentsList() {

//     try {
//        const departmentsListResults = await db.promise().query('SELECT name, id as value FROM department ORDER BY id')

//        return departmentsListResults[0];

//     }

//     catch(err) {

//         console.error("Error with grabbing departments list");
//     }
// }





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
    employeesList,
    changeManager,
    managersUpdateList,
    viewSubordinates,
    departmentsList,
    viewDepartmentEmployees,
    deleteDepartment


}