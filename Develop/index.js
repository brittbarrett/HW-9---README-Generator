const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown");
const writeFileAsync = util.promisify(fs.writeFile);
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is your project title?",
  },
  {
    type: "input",
    name: "description",
    message: "What is your project's description?",
  },
  {
    type: "input",
    name: "installation",
    message: "What do you need to install?",
  },
  {
    type: "input",
    name: "usage",
    message: "Do you have any examples for use?",
  },
  {
    type: "input",
    name: "license",
    message: "Do you have any liscence restrictions?",
  },
  {
    type: "input",
    name: "contribution",
    message: "Who are the contributors?",
  },
  {
    type: "input",
    name: "tests",
    message:
      "Do you have any tests for your application? If so provide how to run it",
  },
  {
    type: "input",
    name: "username",
    message: "What is your Github username?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "credits",
    message: "Credits?",
  },
];
function writeToFile(fileName, data) {
  return writeFileAsync(fileName, data);
}
function init() {
  inquirer
    .prompt(questions)
    .then(function ({
      title,
      description,
      installation,
      usage,
      license,
      contribution,
      tests,
      username,
      email,
      credits,
    }) {
      //console.log(location);
      const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
      const userInputObj = {
        username: username,
        queryUrl: queryUrl,
        title: title,
        description: description,
        installation: installation,
        usage: usage,
        license: license,
        contribution: contribution,
        tests: tests,
        email: email,
        credits: credits,
      };
      return userInputObj;
    })
    .then(function (userInputObj) {
      axios
        .get(userInputObj.queryUrl)
        .then(function (res) {
          // const githubIcon = res.data[0].owner.avatar_url
          // console.log(githubIcon)
          userInputObj.githubIcon = res.data[0].owner.avatar_url;
          //console.log(userInputObj)
          return userInputObj;
        })
        .then(function (userInputObj) {
          console.log(userInputObj);
          const html = generateMarkdown(userInputObj);
          console.log(html);
          writeToFile("Readme.md", html);
        });
    });
}
init();
