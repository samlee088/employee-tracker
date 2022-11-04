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


// async function viewDepartmentsAll() {
//     allDepartmentsResults = await runData.queryAllDepartments();
//     console.table(viewDepartmentsAll);
//     return allDepartmentsResults;

// }

async function init() {
    let initialPromptResponse = await inquirer.prompt(initialPrompt)
    switch(initialPromptResponse.initialAction) {
        case ('view all departments'):
        console.log('test')
        queryRun.queryAllDepartments;

        
        return;

        case('view all roles'):
        console.log('test2')
        return;

        case('view all employees'):
        console.log('test3')
        return;

        case('add a department'):
        console.log('test4')
        return;

        case('add a role'):
        console.log('test5')
        return;

        case('add an employee'):
        console.log('test6')
        return;

        case('update an employee'):
        console.log('test7')
        return;

        default:
        console.info("Please select a valid option")
        return;
    }



}

init();
