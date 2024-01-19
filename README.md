This is an user API where user can login, create, update and delete users.  Once user is logged in, they will be checked to see whethere they are authorized to certain things. 
How to install this app on their local machine: 
Step 1: clone the project to the place on your computer. 
step 2: on the terminal, code . to open the project. 
step 3: run the command npm i to set up the app and download all the pakages and modules.

What global installations they need and what files do they need to create that didn't come in the github repo
You need express, node.js, mongoose, mongoDB, bcrypt, jasonwebtoken to run those code. 
You need to add your mongoDB URI in the .env 

How to start the app in dev mode
download and set up nodemon and run the command npm run dev

How to make an api request in Postman (i.e what port, what url etc)
method: get , url: localhost:3000/users  to see all the users
method: post , url: localhost:3000/users  to create a new user
method: put , url: localhost:3000/users/:id  to update the user
method: delete , url: localhost:3000/:id to delete the user
method: post , url: localhost:3000/login to login the user

How to run tests
step 1: set up the package.json. In the script, change "test"'s value to be "jest" and add the key value pair "jest": {"testEnvironment": "node" } after script.
step 2: npm i -D supertest to set up the supertest package.
step 3: run the command line npm run test.

How to start the app without dev mode.
