//Import inquirer
const inquirer = require('inquirer');
//Import fs to read/write
const fs = require('fs');
//const fetch = require('node-fetch');

const promptFeature = ()    =>  {
    return inquirer.prompt([
       { 
        type: 'input',
        message: "What is a feature of your project?",
        name: 'feature',
       },
       {
        type: 'confirm',
        message : "Do you want to add more features?",
        name: "addMore",
       },
    ])
};




const collectFeatures = async() =>  {
    const features = [];
    let addMore = true;

    while (addMore) {
        const answers = await promptFeature();
        features.push(answers.feature);
        addMore = answers.addMore;
    }
    return features;
};


inquirer
    .prompt([
        {
            type: 'input',
            message: "What is your Github username?",
            name: 'username',
        },
        {
            type: 'input',
            message: "What is your email address?",
            name: 'email',
        },
        {
            type: 'input',
            message: "What is your project's name?",
            name: 'repoName'
        },
        {
            type: 'input',
            message: "Please write a short description of your project",
            name: 'description'
        },
        {
            type: 'list',
            message: "What kind of license should your project have?",
            name: 'license',
            choices: [
                "MIT",
                "APACHE 2.0",
                "GPL 3.0",
                "BSD 3",
                "None"
            ]
        },
        {
            type: 'input',
            message: "What command should be run to install dependencies?",
            name: 'dependency'
        },
        {
            type: 'input',
            message: "What command should be run to run test?",
            name: 'test'
        },
        {
            type: 'input',
            message: "What does the user need to know about using the repo?",
            name: 'usage'
        },
        {
            type: 'input',
            message: "what does the user need to know about contributing to the repo?",
            name: 'contribution'
        },
        {
            type: 'checkbox',
            message: "What are the technologies you used to build your project?",
            name: 'technology',
            choices: [
                "JavaScript",
                "CSS",
                "HTML",
                "React",
                "Express",
                "MongoDB",
                "Node.js"
            ]
        },
       
    ])
    .then(async(answers) =>   {
        answers.features = await collectFeatures();
    })
    .catch((error) => {
        error ? console.error("error!") : console.log("Successfully create a Readme.md")
    })