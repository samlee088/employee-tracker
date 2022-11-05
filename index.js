const inquirer= require('inquirer');
const cTable = require('console.table');
const queryRun = require('./sql');
const e = require('express');






let initialPrompt = [
    {
        type:'list',
        message:'Please choose from the following options',
        name:'initialAction',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee','update employees manager','view employees by manager']
    },
];


let addDepartmentPrompt = [
    {
        type:'prompt',
        message:'What is the department name?',
        name:'departmentName',

    },

]



let addRolePrompt = [
    {
        type: 'input',
        message: 'What is the name of the new role?',
        name:'roleName',

    },
    {
        type:'input',
        message:'What is the salary?',
        name:'roleSalary',

    },
    {
        type:'list',
        message:'Which department would they be a part of?',
        name:'roleDepartment',
        choices: async () => {return await queryRun.departmentsList()},

    }

]




let addEmployeePrompt = [
    {
        type:'input',
        message:'What is the employees first name?',
        name:'first_name',

    },
    {
        type:'input',
        message:'What is the employees last name?',
        name:'last_name',

    },
    {
        type:'list',
        message:'What is the role?',
        name:'employee_role',
        choices: async() => {return await queryRun.rolesList()},

    },
    {
        type:'list',
        message:'Who is the employees manager?',
        name:'employeeManager',
        choices: async() => {return await queryRun.managersList()},

    },
]


let roleUpdatePrompt = [
    {
        type:'list',
        message:'Who is the employee to update?',
        name:'employee',
        choices: async() => { return await queryRun.employeesList()},
        
    },
    {
        type:'list',
        message:'What is the employees new role?',
        name:'newRole',
        choices: async() => { return await queryRun.rolesList()},

    },

]

let updateEmployeeManager = [
    {
        type:'list',
        message:'Who is the employee to update?',
        name:'employee',
        choices: async() => { return await queryRun.employeesList()},
    },
    {
        type:'list',
        message:'Who is the employees new manager?',
        name:'newManager',
        choices: async() => { return await queryRun.managersList()},

    },

]

let selectManager = [
    {
        type:'list',
        message:'Which manager would you like to see which employees report to?',
        name:'Manager',
        choices: async() =>{return await queryRun.managersList()},

    },

]

let initialPromptResponse 

function init() {
    // initialPromptResponse = await inquirer.prompt(initialPrompt)

    inquirer
    .prompt(initialPrompt)
    .then((response) => {
        determineAction(response);
    })



    
    // determineAction(initialPromptResponse);
}

async function determineAction(response) {
    switch(response.initialAction) {
        
        case ('view all departments'):
            await queryRun.queryAllDepartments(init);
            break;

        case('view all roles'):
            await queryRun.queryAllRoles(init);
            break;

        case('view all employees'):
            await queryRun.queryAllEmployees(init);
            break;

        case('add a department'):
            inquirer
            .prompt(addDepartmentPrompt)
            .then((response) => {
                const {departmentName} = response
                queryRun.addDepartment(departmentName,init);
                init();
            });
            
            break;

        case('add a role'):
            inquirer
            .prompt(addRolePrompt)
            .then((response) =>{
                const {roleName, roleSalary, roleDepartment} = response
                queryRun.addRole(roleName, roleSalary, roleDepartment,init)

              

            })
            break;

        case('add an employee'):
            inquirer 
            .prompt(addEmployeePrompt)
            .then((response) => {
                const {first_name, last_name, employee_role, employeeManager} = response;
                console.log(first_name, last_name, employee_role, employeeManager);
                queryRun.addEmployee(first_name, last_name, employee_role, employeeManager,init);

                


        })

      
        break;

        case('update an employee'):
        inquirer
        .prompt(roleUpdatePrompt)
        .then((response) => {
            const {employee,newRole} = response;
            queryRun.changeRole(employee,newRole,init)

            

        })
        break;

        case('update employees manager'):
        inquirer
        .prompt(updateEmployeeManager)
        .then((response) => {
        const {employee, newManager} = response;
        queryRun.changeManager(employee, newManager, init);

        });

        break;

        case('view employees by manager'):
        inquirer
        .prompt(selectManager)
        .then((response) => {
            console.log(response);
            
            queryRun.viewSubordinates(response,init);
        })

        break;

        default:
        console.info("Please select a valid option")
        break;
    }

}


init();
