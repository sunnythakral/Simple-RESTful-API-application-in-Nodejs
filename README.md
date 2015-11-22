# Messages RESTful API App

This API does the following:

- Uses mean stack architecture (Refer to Application architecture diagram.png to get architecture overview)
- Handles CRUD for a message item (Refer to mean-stack-architecture-sequence-diagram.png to understand sequence of flow of events for this type of mean stack application)
- Uses HTTP to make it RESTful (GET, POST, PUT, and DELETE)
- Returns JSON data (as we are using Nodejs)

This API in turn is used by a client GUI running an AngularJS UI or by any other method the user requires(eg: POSTMAN or their own browser application capable of using RESTful API)

# FOLDER STRUCTURE:


Nodejs serverAPI:
-
- app/						//location of MongoDB model (built through MongooseJS)
- --- models/
- -------- message.js  // our message model
- node_modules/     // created by npm. holds our dependencies/packages
- package.json      // define all our node app and dependencies
- server.js         // configure our application and create routes


AngularJS User interface:
-
- app/
- --- index.html				//the homepage of the user interface
- --- css/
- -------- bootstrap.min.css   	//bootstrap framework
- -------- custom.css	       	//custom CSS styling
- --- js/
- -------- angular.min.js		//angular framework
- -------- app.js				//angular module and controller


NOTE: Make sure to install MongoDB and start up MongoDB with the 'mongod' command and the server.


Run instructions:
- run the mongodDB server using the 'mongod' command
- cd to directory of package.json file and run $ npm install
- run with node '$ node server.js'
- open the web browser and type 'http://localhost:8080'
- Use 'GET' command on the UI to get all the message posts within the database messagesDB database
- On specifying the particular ID for the GET command, that particular message is retrieved from the database and a palindrome check takes place to detemine if the message is in palindrome or not. 
NOTE: We have done 'npm install is-palindrome' in CLI to use this module in our server.js to do palindrome check on our messages
- Each time you perform a POST,PUT or DELETE, do a GET without specifying any message ID to get all the messages and see how the message list has changed in messagesDB



