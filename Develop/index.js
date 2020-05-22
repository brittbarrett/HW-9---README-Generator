const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown");
const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
    type: "input",
    name: "name",
    message: "What is your username?",
  },
  {
    type: "input",
    name: "location",
    message: "Where are you from?",
  },
];

function writeToFile(fileName, data) {
  console.log("should write into file");
  return writeFileAsync(fileName, data);
}

function init() {
  inquirer.prompt(questions).then(function ({ username, location }) {
    console.log(location);
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    console.log(queryUrl);
    axios.get(queryUrl).then(function (res) {
      const repoNames = res.data.avatar_url;
    });
    // const html = generateMarkdown(answers, "brittbarrett");
    // console.log(html);
    // writeToFile("Readme.md", html);
  });
}

init();
