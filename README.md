# Social-Network-API using MongoDB

## Table of Contents:

- [Description](#description)
- [Technologies-Used](#technologies-used)
- [Required Additional Technologies](#required-additional-technologies) 
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [License](#license)

## Description:

The application uses Express.js and Mongoose to interact with a MongoDB non-relational database to create the backend of a social network API. To interact with the application you will need insomnia to run HTTP requests on the application and view/edit database information.

## Technologies Used:

- Node.js
- MongoDB
- Mongoose 
- Express.js
- Moment.js

## Required Additional Technologies:
- Insomnia

## Installation:

This application requires npm package dependencies.
For installation, from the root folder of the project in your terminal command line, run:
```
npm install
```
To start the server and connect to the database, run
```
npm start
```
When successfully launched, you will see the following message in your terminal:
``` 
App server running on port 3001!
```
Please note: No seed data is required - you will be able to add your own information within insomnia once you have launched the server

## Usage:

This application requires the use of Insomnia in order to view and interact with the database information. Once you have completed the installation steps listed above, open Insomnia and navigate to localhost:3001

To view information of social networking sites backend database, you can run HTTP GET, POST, PUT, and DELETE requests on users and thoughts using the following end points:

- localhost:3001/api/users --- to view all users
- localhost:3001/api/users/:userId --- to view, delete, and update a specific user

- localhost:3001/api/thoughts --- to view all thoughts
- localhost:3001/api/users/:thoughtId --- to view, delete, and update a specific thought 

The site is also set up to do HTTP POST  & PUT requests for user reactions - and user friends. Use the following endpoints:

- localhost:3001/api/users/:userId/friends/:friendId --- to add or remove a friend from a users account
- localhost:3001/api/thoughts/:thoughtId/reactions --- to add a reaction to a thought
- localhost:3001/api/thoughts:thoughtId/reaction/:reactionId --- to remove a reaction from a thought

## Demo:

[View a video walk through of this application in use](https://drive.google.com/file/d/1YPzLBcUlBRjSgMyd_qIeTbJk4qQmmnRx/view)

## License: 
na
