# Toolin' Around - a community toolshed
We're making it easier to find and borrow tools from your neighbors!
## Licensing:
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
* [User Story](#UserStory)
* [Installation](#Installation)
* [Usage](#Usage)
* [Technologies](#Technologies)
* [Next Steps](#Technologies)
* [Contributors](#Contributors)
* [Contact](#Contact)
* [Links](#Links)

## User Story 
* As a user, I want to see a list of available tools in my neighborhood. 
* As a user, I want the ability to create an account. 
* As a registered user, I want to post my own tools available for others to borrow. 
* As a registered user, I want to be able to request available tools. 
## Acceptance Criteria 
* GIVEN a tool-lending site 
* WHEN I visit the site for the first time 
* THEN I am presented with the homepage, which includes a site intro and welcome 
* WHEN I click on Login or any other links in the navigation 
* THEN I am prompted to either sign up or sign in 
* WHEN I choose to sign up 
* THEN I am prompted to provide a username, email and password 
* WHEN I click on the sign-up button 
* THEN my user credentials are saved and I am logged into the site 
* WHEN I revisit the site at a later time and choose to login 
* THEN I am prompted to enter my email and password 
* WHEN I am logged in to the site 
* THEN I see navigation links for the homepage, my toolbox, my neighborhood, a search bar, and the option to log out
* WHEN I am logged in to the site,
* THEN I am presented with the homepage, which includes options for tool categories 
* WHEN I click on a tool category on the homepage
* THEN I a presented with all tools posted by user's in my neighborhood in that category
* WHEN I click on an individual tool that is not my tool,
* THEN I am presented with that tool's name, description, clickable owner's name, and a button to request to borrow the tool
* WHEN I click the owner's name on a tool,
* THEN I am presented with a list of that user's tools
* WHEN I click on the button to request to borrow a tool
* THEN I am notified that an email was sent and an email is sent to the tool owner with the request
* WHEN I click on my toolbox in the navigation bar
* THEN I can see all of the tools that I've posted and an option to add a tool
* WHEN I click on the add a tool button
* THEN I am prompted to provide a tool name, desciption, and category
* WHEN I submit a new tool,
* THEN I am presented with my updated toolbox with the new tool added 
* WHEN I click on one of my tool's
* THEN I am presented with the tool name, the tool description and have the option to edit or delete the tool 
* WHEN I click on the edit button
* THEN I am presented with a form to update the tool name, description, and/or category
* WHEN I submit an edited tool
* THEN I am presented with that updated tool's name, description, and/or category
* WHEN I click on the delete tool button
* THEN I am presented with my updated toolbox page with the tool deleted 
* WHEN I enter a search term in the search bar
* THEN I am presented with all tools, in all neighborhoods, whose title or description match the search term 
* WHEN I click on my neighborhood name in the navigation bar
* THEN I can see all of the tools available in my neighborhood with category icon
* WHEN I click on the logout option in the navigation 
* THEN I am signed out of the site

## Installation
Fork this repo and download the files to your local environment. Install the dependencies and create a .env file.

1. Fork the [repository](https://github.com/merewall/Toolin-Around) from [GitHub](https://github.com/) to your profile.
2. Clone the repository down to your local machine in command-line using: `git clone`.
3. Node.js is required to run this application. Click [here](#installing-nodejs) for instructions on installing Node.js.
4. Install the required dependices to your cloned directory in command-line using: `npm install` and create a .env file to store your sensitive variables.

   - Or install the packages individually...
     - Install [express](https://www.npmjs.com/package/express) to your cloned directory in command-line using: `npm install express`.
     - Install [mysql2](https://www.npmjs.com/package/mysql2) to your cloned directory in command-line using: `npm install --save mysql2`
     - Install [dotenv](https://www.npmjs.com/package/dotenv) to your cloned directory in command-line using: `npm install dotenv`
     - Install [sequelize](https://www.npmjs.com/package/sequelize) to your cloned directory in command-line using: `npm install sequelize`
     - Install [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) to your cloned directory in command-line using: `npm install connect-session-sequelize`
     - Install [express-handlebars](https://www.npmjs.com/package/express-handlebars) to your cloned directory in command-line using: `npm install express-handlebars`
     - Install [express session](https://www.npmjs.com/package/express-session) to your cloned directory in command-line using: `npm install express-session`
     - Install [bcrypt](https://www.npmjs.com/package/bcrypt) to your cloned directory in command-line using: `npm install bcrypt`
     - Install [nodemailer](https://www.npmjs.com/package/nodemailer) to your cloned directory in command-line using: `npm install nodemailer`

   ###### Installing Nodejs

   1. Check if you already have Node.js in command-line by typing `node`.
   2. If you have Node.js on your machine, a message similar to `Welcome to Node.js` will appear.
   3. If you do not have Node.js, an error message will appear and you need to download it.
   4. To download Node.js, click [here](https://nodejs.org/en/download/).
   5. After download and installation is complete, restart your command-line terminal and redo step 1 to confirm a successful installation.
   6. After Node.js is on your local machine, return to the [installation](#installation) instructions for this project's application above.

## Usage
_If cloned down to your computer..._

1. Add an .env file with your MySQL username, database name, and MySQL password, gmail email address, and email password.
2. Navigate to the directory of the application in your terminal using `cd`, if not already there.
3. If you haven't already, be sure you followed all [installation](#installation) instructions to install node, express, dotenv, express-handlebars, express-session, connect-session-sequelize, brcypt, sequelize, mysql2, and nodemailer dependencies.
4. Create your database by running the schema.sql file (right-clicking on the schema file and selecting Run MySQL Query).
5. Seed your database in CLI using: `npm run seed`.
6. Initialize the application in CLI using: `npm start`.
7. Go to https://localhost:3001 to visit application

_If accessing deployed Heroku application..._

1. View homepage welcome and intro.
2. Click Login to login or sign up.
3. View all tool categories on logged in homepage.
4. Click a category to view all tools in your neighborhood in that neighborhood.
5. Click a tool to view tool name, description, owner, and request to borrow button.
6. Click the "Request to Borrow" button to send an email to the tool's owner with templated request email.
7. Click "My Toolbox" to view all of your posted tools and the option to add a new tool.
8. Click Add a Tool to add a tool to your toolbox for other neighbors to request to borrow.
9. Click one of your tools in your toolbox to get the option to edit or delete the tool.
10. Click the edit tool button to update the tool's name, description or category.
11. Click the delete tool button to remove the tool from your toolbox and the site.
12. Click your neighborhood name in the navigation bar to view all tools available in your neighborhood.
13. Type and submit a term in the search bar to view all tools with a title or description containing that search term.
14. On an individual tool, click the tool owner's name to view all of that user's tools.
15. Logout to end your session and close access to your toolbox.

## Technologies
* JavaScript
* Node.js
* Express.js
* MySQL
* Sequelize
* Handlebars
* Bcrypt
* Nodemailer
* Materialize
## Next Steps
* Borrowed status - each tool can be marked as available or in use
* Distance calculator - show a user distance to a tool and sort by distance
* User and tool ratings - users can rate borrowers, lenders, and tools and leave reviews for other user's to see
