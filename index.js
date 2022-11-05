const inquirer= require('inquirer');
const cTable = require('console.table');
const queryRun = require('./sql');






let initialPrompt = [
    {
        type:'list',
        message:'Please choose from the following options',
        name:'initialAction',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee']
    },
];


let addRolePrompt = [
    {
        type: 'input',
        message: 'What is the name fo the new role?',
        name:'roleName',

    },
    {
        type:'input',
        message:'What is the salary?',
        name:'roleSalary',

    },
    {
        type:'input',
        message:'What is the department number?',
        name:'roleDepartment',
        
    }


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

function determineAction(response) {
    switch(response.initialAction) {
        
        case ('view all departments'):
        console.log('test')
        // let data = queryRun.queryAllDepartments();
        // console.table(data);
        queryRun.queryAllDepartments();
        console.log('tetset');
        break;

        case('view all roles'):
        console.log('test2')
        queryRun.queryAllRoles();

        break;

        case('view all employees'):
        console.log('test3')
        queryRun.queryAllEmployees();
        break;

        case('add a department'):
        console.log('test4')
        break;

        case('add a role'):
        console.log('test5')
        break;

        case('add an employee'):
        console.log('test6')
        break;

        case('update an employee'):
        console.log('test7')
        break;

        default:
        console.info("Please select a valid option")
        break;
    }
    
    init();

}

init();
