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


let initialPromptResponse 

async function init() {
    initialPromptResponse = await inquirer.prompt(initialPrompt)

    determineAction(initialPromptResponse);
}

function determineAction(initialPromptResponse) {
    switch(initialPromptResponse.initialAction) {
        
        case ('view all departments'):
        console.log('test')
        queryRun.queryAllDepartments();
        init();
        console.log('tetset');
        break;

        case('view all roles'):
        console.log('test2')
        
        break;

        case('view all employees'):
        console.log('test3')
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
    return;
  

}

init();
