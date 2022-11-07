const inquirer= require('inquirer');
const queryRun = require('./sql');


/* This starts the section of the inquirer prompts, starting with the base initial set. This is set up so that a user can add in additional choices from the start, and can append new queries to existing functions or create new ones */
let initialPrompt = [
    {
        type:'list',
        message:'Please choose from the following options',
        name:'initialAction',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role','update employees manager','view employees by manager', 'view employees by department', 'delete entry','view department budget'],
    },

];


/* The next grouping of functions are to dynamically import values from data tables as options for inquirer prompts */
let departmentChoices = [
    {
        type:'list',
        message:'What is the department?',
        name:'roleDepartment',
        choices: async () => {return await queryRun.departmentsList()},
    
    },
    
]
    
let roleChoices = [
    {
        type:'list',
         message:'What is the role?',
        name:'employee_role',
        choices: async() => {return await queryRun.rolesList()},
    
    },
    
]
    
let employeeChoices = [
    {
        type:'list',
        message:'Who is the employee to update?',
        name:'employee',
        choices: async() => { return await queryRun.employeesList()},
        
    },

]

let managersChoicesWithNull = [
    {
        type:'list',
        message:'Who is the employees manager?',
        name:'employeeManager',
        choices: async() => {return await queryRun.managersListWithNull()},

    },

]

/* These next prompts are 'building block' prompts that apply to specific initial prompt responses that used along side the choices queries */
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

]

let selectManager = [
    {
        type:'list',
        message:'Which manager would you like to see which employees report to?',
        name:'Manager',
        choices: async() =>{return await queryRun.managersList()},

    },

]

let deleteEntryPrompt = [
    {
        type:'list',
        message:'Which of the following would you like to delete?',
        name:'delete',
        choices:['department', 'role', 'employee'],

    },

]



/* This is the initial function that starts the base set of initial options */
function init() {
    inquirer
        .prompt(initialPrompt)
        .then((response) => {
            determineAction(response);
        })
};


/* The initial tree decision will lead here to the action items for the initial prompt responses. */
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
                });
        break;

        case('add a role'):
            inquirer
                .prompt(addRolePrompt.concat(departmentChoices))
                .then((response) =>{
                    const {roleName, roleSalary, roleDepartment} = response
                    queryRun.addRole(roleName, roleSalary, roleDepartment,init)
                });
        break;

        case('add an employee'):
            inquirer 
                .prompt(addEmployeePrompt.concat(roleChoices, managersChoicesWithNull))
                .then((response) => {
                    const {first_name, last_name, employee_role, employeeManager} = response;
                    
                    if (employeeManager =='NULL') {

                        queryRun.addEmployeeAsManager(first_name, last_name, employee_role, init)
                    }

                    else {
                        queryRun.addEmployee(first_name, last_name, employee_role, employeeManager,init);
                    }
                });
        break;

         case('update an employee role'):
            inquirer
                .prompt(employeeChoices.concat(roleChoices))
                .then((response) => {
                    const {employee, employee_role} = response;
                    queryRun.changeRole(employee,employee_role,init)

                });
        break;

        case('update employees manager'):
            inquirer
                .prompt(employeeChoices.concat(managersChoicesWithNull))
                .then((response) => {
                    const {employee, employeeManager} = response;
                    queryRun.changeManager(employee, employeeManager, init);
                });
        break;

        case('view employees by manager'):
            inquirer
                .prompt(selectManager)
                .then((response) => {
                    queryRun.viewSubordinates(response,init);
                });
        break;

        case('view employees by department'):
            inquirer
                .prompt(departmentChoices)
                .then((response) => {
                    queryRun.viewDepartmentEmployees(response,init);
                });
        break;

        case('delete entry'):
            inquirer
                .prompt(deleteEntryPrompt)
                .then((response) => {
                    deleteEntryTrigger(response)
                });
        break;

        case('view department budget'):
            inquirer
                .prompt(departmentChoices)
                .then((response) => {
                    queryRun.departmentBudget(response,init);
                });
        break;

        default:
            console.info("Please select a valid option")
        break;
    };

};


/* Decision tree based on which option to delete is selected */
function deleteEntryTrigger(deleteClass) {
   
    switch(deleteClass.delete) {

        case('department'):
            inquirer
                .prompt(departmentChoices)
                .then((response) => {
                    queryRun.deleteDepartment(response,init)
                }) 
        break;

        case('role'):
            inquirer 
                .prompt(roleChoices)
                .then((response) => {
                    queryRun.deleteRole(response,init);
                })

        break;

        case('employee'):
            inquirer
                .prompt(employeeChoices)
                .then((response) => {
                    queryRun.deleteEmployee(response,init);
                })

        break;

        default:
            console.info("Please select a valid option");
        break;

    };
};

init();
