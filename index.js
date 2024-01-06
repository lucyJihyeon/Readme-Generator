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
      type: "input",
      message: "Write a description of the feature",
      name: "featuredesc",
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
  const featureDesc = [];
  let addMore = true;
  let readmeF = "";
  while (addMore) {
    const answers = await promptFeature();
    features.push(answers.feature);
    featureDesc.push(answers.featuredesc);
    addMore = answers.addMore;
  }
  console.log(features);
  for (let i = 0; i < features.length; i++) {
    readmeF +=
      "## " + features[i] + `\n### Description` + `\n` + featureDesc[i] + `\n`;
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
      type: "input",
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
      type: "input",
      message: "What command should be run to install dependencies?",
      name: "dependency",
    },
    {
      type: "input",
      message: "What command should be run to run test?",
      name: "test",
    },
    {
      type: "input",
      message: "What does the user need to know about using the repo?",
      name: "usage",
    },
    {
      type: "input",
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
    console.log(answers.features);
    const context = 
    `
# ${answers.repoName}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies-Used](#technologies)
- [License](#license)
- [Contribution](#contribution)
- [Tests](#tests)
- [Preview](#preview)
- [Link](#link)
- [Contact](#contact)

## Installation 
To install necessary denpendencies, run following command:
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
- **GitHub:** ${answers.username}

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
