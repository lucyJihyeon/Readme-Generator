//Import inquirer
const inquirer = require("inquirer");
//Import fs to read/write
const fs = require("fs");

//function to prompt the user to enter features of the project
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

//use async to use the promise return from promptFeature function.
const collectFeatures = async () => {
  //empty features/ userstory/ acceptedCriteria array
  const features = [];
  const userStory = [];
  const acceptedCriteria = [];
  //retrieved from the promptFeature prompt
  let addMore = true;
  let readmeF = "";
  while (addMore) {
    //push the answers from the promptFeature function to the array.
    const answers = await promptFeature();
    features.push(answers.feature);
    userStory.push(answers.userstory);
    acceptedCriteria.push(answers.acceptedcriteria);
    addMore = answers.addMore;
  }
  //update the readme feature section dynamically using the user inputs
  for (let i = 0; i < features.length; i++) {
    readmeF +=
      "## " + features[i] + `\n### User Story\n` + userStory[i] + `\n### Accepted Criteria\n` + acceptedCriteria[i] + `\n`;
  }
  return readmeF;
};

//use inquirer to prompt users to ask questions
inquirer
  .prompt([
    //prompt the user to enter their github username
    {
      type: "input",
      message: "What is your Github username?",
      name: "username",
    },
    //prompt the user to enter their email address
    {
      type: "input",
      message: "What is your email address?",
      name: "email",
    },
    //prompt the user to enter their project name
    {
      type: "input",
      message: "What is your project's name?",
      name: "repoName",
    },
    //prompt the user to write about their project
    //editor type to allow users to enter multi lines/ edit them as needed
    {
      type: "editor",
      message: "Please write a short description of your project",
      name: "description",
    },
    //prompt the user to choose a license from a list using an arrow
    {
      type: "list",
      message: "What kind of license should your project have?",
      name: "license",
      choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
    },
    //prompt the user to write about the installation 
    {
      type: "editor",
      message: "What command should be run to install dependencies?",
      name: "dependency",
    },
    //prompt the user to write how to run test
    {
      type: "input",
      message: "What command should be run to run test?",
      name: "test",
    },
    //prompt the user to write about the usage
    {
      type: "editor",
      message: "What does the user need to know about using the repo?",
      name: "usage",
    },
    //prompt the user to write about the contributioin
    {
      type: "editor",
      message:
        "what does the user need to know about contributing to the repo?",
      name: "contribution",
    },
    //prompt the user to provide a list of technologies used
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
    //prompt the user to enter the pathway of a preview image
    {
        type: 'input',
        message: "Enter your preview pathway",
        name: 'preview'
    },
    //prompt the user to enter the deployed link of the user's project
    {
        type: 'input',
        message: "Enter the deployed link of your project",
        name: 'link'
    }
  ])
  //collect the features from the collectFeatures function 
  //use async and await to wait for the promise(from the collectFeatures function) to be resolved before proceeding
  .then(async (answers) => {
    answers.features = await collectFeatures();
    //Generated the README content based on the user inputs.
    const content = 
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

//Write the generated "content" to the "README.md" 
    fs.writeFile("README.md", content, (error) => {
      //if error happens, log "Error writing README.md!". Otherwise, log "Successfully created README.md"
      error
        ? console.log("Error writing README.md!")
        : console.log("Successfully created README.md");
    });
  })
  .catch((error) => {
    console.log("Error in Promise: ", error);
  });
