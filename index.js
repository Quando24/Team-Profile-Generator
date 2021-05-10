const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./Lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const { run } = require('jest');

// use inquirer to ask the user if they want to add Manager, Engineer, or Intern
const employees = [];

function initApp() {
    startHtml();
    chooseEmployee();
}
function chooseEmployee() {
    inquirer.prompt([
        {
            message: "Please enter the employee's name",
            name: 'name'
        },
        {
            type: 'list',
            message: 'Choose an employee type to add',
            name: 'employee',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
        {
            message: "Enter the employee's id",
            name: 'id',
        },
        {
            message: "Enter the employee's email",
            name: 'email',
        }])
        // use inquerier to ask specific qusetions for the new Employee 
        .then(function({ name, employee, id, email }) {
            let employeeType = "";
            if (employee === "Manager") {
                employeeType = "Office Number";
            } else if (employee === "Engineer") {
                employeeType = "GitHub Username";
            } else {
                employeeType = "Name of school";
            }
            inquirer.prompt([{
                message: `Enter the employee's ${employeeType}`,
                name: "employeeType"
            },
            {
                type: "list",
                message: "Would you like to add another employee?",
                name: "addEmployee",
                choices: ["Yes", "No"], 

            }])
                .then(function ({employeeType, addEmployee}) {
                    let newPosition = "";
                    if (employee === "Manager") {
                        newPosition = new Manager(name, id, email, employeeType);
                    } else if (employee === "Engineer") {
                        newPosition = new Engineer(name, id, email, employeeType);
                    } else {
                        newPosition = new Intern(name, id, email, employeeType);
                    }
                    employees.push(newPosition);
                    addHtml(newPosition)
                        .then(function () {
                            if (addEmployee === "Yes") {
                               chooseEmployee();
                            } else {
                                finishHtml();
                            }
                        });

                });
        });
}

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
        <title>Team Profile Generator</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile Generated</span>
        </nav>
        <div class="container">
            <div class="row align-items-start">`;
    // use fs to write to HTML 
    fs.writeFile('team.html', html, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;     
    });

}

function addHtml(employed) {
    return new Promise(function (resolve, reject) {
        const name = employed.getName();
        const role = employed.getRole();
        const id = employed.getId();
        const email = employed.getEmail();
        let data = "";
        if (role === "Manager") {
            const officeNumber = employed.getOfficeNumber();
            data = `<div class="col">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}" target="_blank" rel"noreferrer">${email}</a></li>
                <li class="list-group-item">Office Number: ${officeNumber}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Engineer") {
            const gitHub = employed.getGitHub();
            data = `<div class="col">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}" target="_blank" rel"noreferrer">${email}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${gitHub}" target="_blank" rel="noreferrer">${gitHub}</a></li>
            </ul>
            </div>
        </div>`;
        } else {
            const school = employed.getSchool();
            data = `<div class="col">
            <div class="card mx-auto mb-3" style="width: 19rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}" target="_blank" rel"noreferrer">${email}</a></li>
                <li class="list-group-item">Name of School: ${school}</li>
            </ul>
            </div>
        </div>`
        }
        fs.appendFile('team.html', data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });






}

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile('team.html', html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("finish");

}
initApp();



