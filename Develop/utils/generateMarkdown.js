function generateMarkdown(userInputObj) {
  return `
# Github Account: ${userInputObj.username}
# Email: ${userInputObj.email}
![Image of Github User](${userInputObj.githubIcon})
# ${userInputObj.title}
## Description 
${userInputObj.description}
## Table of Contents (Optional)
If your README is very long, add a table of contents to make it easy for users to find what they need.
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
## Installation
 ${userInputObj.installation}
## Usage 
 ${userInputObj.usage}
## Credits
 ${userInputObj.credits}
## License
 ${userInputObj.license}
 ## Contributing
 ${userInputObj.contribution}
## Tests
 ${userInputObj.tests}
`;
}
module.exports = generateMarkdown;
