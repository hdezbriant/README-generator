const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const renderLicenseSection = require('./utils/generateMarkdown.js');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'projectTitle',
            message: 'What is the title of your project?',
        },
        {
            type: 'input',
            name: 'projectDesc',
            message: "Describe what your project does. Be as detailed as you'd like!",
        },
        {
            type: 'input',
            name: 'installInstr',
            message: 'Describe the installation process for your project.',
        },
        {
            type: 'input',
            name: 'usageInfo',
            message: 'Describe how to use the application.',
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'How can others contribute to this project?',
        },
        {
            type: 'input',
            name: 'testInstr',
            message: 'Describe the process to test this application.',
        },
        {
            type: 'list',
            name: 'licenses',
            message: 'Which license would you like to use?',
            choices: ['MIT', 'Apache', 'BSD3']
        },
        {
            type: 'input',
            name: 'github',
            message: "What's your Github username?",
        },
        {
            type: 'input',
            name: 'email',
            message: 'An E-mail address where others can reach you?'
        }
    ]);
};


const generateReadme = (answers) =>
    `
![License](https://img.shields.io/badge/license-${answers.licenses}-blue)

# ${answers.projectTitle}  

## Table of Contents
- [Description](#Description)
- [Installation](#Install-Instructions)
- [Usage](#Usage)
- [Contribution](#Contribution-Guidelines)
- [Testing](#Test-Instructions)
- [License](#License)
- [Questions](#Questions?-Contact-Me!)

## Description
${answers.projectDesc}  
  
## Install Instructions  
${answers.installInstr}  
  
## Usage  
${answers.usageInfo}  
  
## Contribution Guidelines  
${answers.contribution}  
  
## Test Instructions  
${answers.testInstr}  

${renderLicenseSection(answers.licenses)}

## Questions? Contact me!
Find me on [Github!](https://github.com/${answers.github}) n\
... Or shoot me an E-mail! <${answers.email}>  

`;

const init = async () => {

    try {
        const answers = await promptUser();
        await writeFileAsync(`./readmes/${answers.projectTitle}-README.md`,
        generateReadme(answers),
        renderLicenseSection(answers)),
        console.log(`Successfully created ${answers.projectTitle}-README.md`)
    } catch (err) {
        console.error(err);
    }
};

init();
