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


let addDepartmentPrompt = [
    {
        type:'prompt',
        message:'What is the department name?',
        name:'departmentName',

    },

]

// let departmentTotalArray = queryRun.departmentsList() || [];
let departmentTotalArray 

// let newArray = departmentTotalArray.map(department => `${department.id} ${department.name}`)
// function createArray(data) {

// departmentTotalArray = [];

//     if (data !== undefined) {
//     for(let i=0; i<data.length; i++) {
//         departmentTotalArray.push(data[i].name)
//     }}
// } 




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
        type:'list',
        message:'Which department would they be a part of?',
        name:'roleDepartment',
        choices: async () => {return await queryRun.queryAllDepartments()},

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
        type:'input',
        message:'What is the role?',
        name:'employee_role',

    },
    {
        type:'input',
        message:'Who is the employees manager?',
        name:'employeeManager',

    },
]


let roleUpdatePrompt = [
    {
        type:'input',
        message:'Who is the employee to update?',
        name:'employee',

    },
    {
        type:'input',
        message:'What is the employees new role?',
        name:'newRole',

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
        
        // let data = queryRun.queryAllDepartments();
        console.table(data);
        queryRun.queryAllDepartments();
        
       
        init();
        break;

        case('view all roles'):
       
        
       const queryAllRolesResults = await queryRun.queryAllRoles();
        console.table(queryAllRolesResults);
        init();
        break;

        case('view all employees'):
      
        queryRun.queryAllEmployees(init);
        // init();
        break;

        case('add a department'):
        // addDepartmentTrigger();

        
        inquirer
        .prompt(addDepartmentPrompt)
        .then((response) => {
            const {departmentName} = response
            queryRun.addDepartment(departmentName);
            init();
        });
        
        break;

        case('add a role'):

        // departmentTotalArray = await grabRoleData();
        // let departmentTotalArray = queryRun.departmentsList();
        // console.log(departmentTotalArray);
        // departmentTotalArray = await queryRun.queryAllDepartments();
        // console.log(departmentTotalArray);

        // let dataResults = await queryRun.departmentsList();
        // await grabRoleData().catch(e => departmentTotalArray = e);
        // await queryRun.queryAllDepartments().catch(e=>departmentTotalArray = e);
        // dataResults.then((data) =>
        // departmentTotalArray = data);
        // const promise = queryRun.departmentsList();
        // promise.then((data) =>
        // departmentTotalArray = data);
        // createArray(data);

        // departmentTotalArray = await queryRun.queryAllDepartments();

        // let addRolePrompt = [
        //     {
        //         type: 'input',
        //         message: 'What is the name fo the new role?',
        //         name:'roleName',
        
        //     },
        //     {
        //         type:'input',
        //         message:'What is the salary?',
        //         name:'roleSalary',
        
        //     },
        //     {
        //         type:'list',
        //         message:'Which department would they be a part of?',
        //         name:'roleDepartment',
        //         choices: departmentTotalArray,
        
        //     }
        
        // ]
        


        // console.info(departmentTotalArray);
        inquirer
        .prompt(addRolePrompt)
        .then((response) =>{
            const {roleName, roleSalary, roleDepartment} = response
            queryRun.addRole(roleName, roleSalary, roleDepartment)

            init();

        })


        
        break;

        case('add an employee'):
        inquirer 
        .prompt(addEmployeePrompt)
        .then((response) => {
            const {first_name, last_name, employee_role, employeeManager} = response;

            queryRun.addEmployee(first_name, last_name, employee_role, employeeManager);

            init();


        })

      
        break;

        case('update an employee'):
        inquirer
        .prompt(roleUpdatePrompt)
        .then((response) => {
            const {employee,newRole} = response;
            queryRun.changeRole(employee,newRole)

            init();

        })
        break;

        default:
        console.info("Please select a valid option")
        break;
    }
    
    // init();

}


async function grabRoleData() {

    const results = queryRun.departmentsList();

    return results;


}
function addDepartmentTrigger() {

    inquirer
    .prompt(addDepartmentPrompt)
    .then((response) => {
        queryRun.addDepartment(response);

    });



    // let addDepartmentResponse =  inquirer(addDepartmentPrompt)

    // await queryRun.addDepartment(addDepartmentResponse);

    console.log("success");
}

init();
