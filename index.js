//Import inquirer
const inquirer = require("inquirer");
//Import fs to read/write
const fs = require("fs");
//const fetch = require('node-fetch');

const promptFeature = () => {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is a feature of your project?",
      name: "feature",
    },
    {
      type: "editor",
      message: "Write a User Story of the feature",
      name: "userstory",
    },
    {
      type: 'editor',
      message: "Write a Accepted Criteria of the feature",
      name: 'acceptedcriteria'
    },
    {
      type: "confirm",
      message: "Do you want to add more features?",
      name: "addMore",
    },
  ]);
};

const collectFeatures = async () => {
  const features = [];
  const userStory = [];
  const acceptedCriteria = [];
  let addMore = true;
  let readmeF = "";
  while (addMore) {
    const answers = await promptFeature();
    features.push(answers.feature);
    userStory.push(answers.userstory);
    acceptedCriteria.push(answers.acceptedcriteria);
    addMore = answers.addMore;
  }
  for (let i = 0; i < features.length; i++) {
    readmeF +=
      "## " + features[i] + `\n### User Story\n` + userStory[i] + `\n### Accepted Criteria\n` + acceptedCriteria[i] + `\n`;
  }
  return readmeF;
};

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your Github username?",
      name: "username",
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email",
    },
    {
      type: "input",
      message: "What is your project's name?",
      name: "repoName",
    },
    {
      type: "editor",
      message: "Please write a short description of your project",
      name: "description",
    },
    {
      type: "list",
      message: "What kind of license should your project have?",
      name: "license",
      choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
    },
    {
      type: "editor",
      message: "What command should be run to install dependencies?",
      name: "dependency",
    },
    {
      type: "input",
      message: "What command should be run to run test?",
      name: "test",
    },
    {
      type: "editor",
      message: "What does the user need to know about using the repo?",
      name: "usage",
    },
    {
      type: "editor",
      message:
        "what does the user need to know about contributing to the repo?",
      name: "contribution",
    },
    {
      type: "checkbox",
      message: "What are the technologies you used to build your project?",
      name: "technology",
      choices: [
        "JavaScript",
        "CSS",
        "HTML",
        "React",
        "Express",
        "MongoDB",
        "Node.js",
      ],
    },
    {
        type: 'input',
        message: "Enter your preview pathway",
        name: 'preview'
    },
    {
        type: 'input',
        message: "Enter the deployed link of your project",
        name: 'link'
    }
  ])
  .then(async (answers) => {
    answers.features = await collectFeatures();
    const context = 
    `
# ${answers.repoName}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies-Used](#technologies-used)
- [License](#license)
- [Contribution](#contribution)
- [Tests](#tests)
- [Preview](#preview)
- [Link](#link)
- [Contact](#contact)

## Installation 
To install necessary dependencies, run following command:
\`\`\`
${answers.dependency}
\`\`\`

## Usage
${answers.usage}

## Features

${answers.features}

## Technologies-Used
${answers.technology}

## License

This project is licensed under the ${answers.license}

## Contribution 
${answers.contribution}

## Test 

To run tests, run the following command:
\`\`\`
${answers.test}
\`\`\`

## Preview 

This is the preview of the application 
![alt preview](${answers.preview})

## Link

This is the link to the application
[alt preview](${answers.link})

## Contact

If you have any questions or suggestions regarding this project, feel free to reach out:

- **Email:** ${answers.email}
- **GitHub:** ${answers.username}(https://github.com/${answers.username})

`;


    fs.writeFile("README.md", context, (error) => {
      error
        ? console.log("Error writing README.md!")
        : console.log("Successfully created README.md");
    });
  })
  .catch((error) => {
    console.log("Error in Promise: ", error);
  });
