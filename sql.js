const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password: 'seahawks8372',
        database:'employee_db'
    },

console.log('Connected to the employee_db database.')
);

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
 function queryAllDepartments() {

     db.query('Select * FROM department ORDER BY id', function(err, results) {
        err ? console.log("Error loading all departments") : console.log("success loading all departments");
       
        console.table(results)
        return ;
    });
    return;
};


// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

function queryAllRoles() {
    db.query('Select r.id, r.title, FROM role r LEFT JOIN department d ON r.department_id = d.id', function(err, results) {
        err ? console.error("Error loading all roles") : console.log("Success loading all roles");
        console.log(results);
        return results;

    })
}



// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

function queryAllEmployees() {
    db.query('SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name FROM employee e LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = role.department_id ORDER BY e.id', function(err, results) {
        err ? console.error("Error loading all employees") : console.log("Success loading all employees");
    return results;
    })

}1





// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

function addDepartment(data) {
    db.query(`INSERT INTO department (id, name) Values (${data.id},${data.name})` , function(err, results) {
    err ? console.error('Error with adding new department') : console.log('Success with adding new department');

    console.log(results);
    } );


}
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database







// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

module.exports = {
    queryAllDepartments,
    queryAllRoles,
    queryAllEmployees
}