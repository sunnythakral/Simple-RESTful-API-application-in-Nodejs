// Author: Sunny Thakral
// server.js
// =====================================================================================//

// calling all the packages we need for the server
var express    = require('express');        // calling express
var app        = express();                 // defining the application using express
var bodyParser = require('body-parser');	//importing the body parser
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var mongoose   = require('mongoose');     //Using mongoose framework 

//connecting to the messageDb database in our MongoDB server running locally on the machine
mongoose.connect('mongodb://localhost:27017/messagesDB', function(error, db) {
        if(!error){
             console.log("We are connectedto the messagesDB");
        }
        else
           console.dir(error);
    });

var Message = require('./app/models/message'); //importing the message model schema we created in /app/models folder

var isPalindrome = require('is-palindrome'); //will be used to check if the message is in palindrome

// configuring application to use bodyParser(), which will let us get the data from a POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

var port = process.env.PORT || 8080;        // setting up our port


// ROUTES for API
// =====================================================================================//
var router = express.Router();              // get an instance of the express Router

// Helps checking is requests are received by the server
router.use(function(req, res, next) {
    console.log('Request is received by the Nodejs server');
    next(); // we go to the next routes and don't stop here
});

// Make sure the route is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Sunnys RESTful API in Nodejs' });   
});


// Routes ending in /messages
// ---------------------------------------------------------------------------------------
router.route('/messages')

    // creating a message (accessed at POST http://localhost:8080/api/messages)
    .post(function(req, res) {
        
        var messageitem = new Message();      	 // create a new instance of the message model
        messageitem.content = req.body.content;  // set the messages content (comes from the request)

        // save the message and check for errors
        messageitem.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Message created!' });
        });     
        
    })
    
    // getting all the messages (accessed at GET http://localhost:8080/api/messages)
	.get(function(req, res) {
		Message.find(function(err, messages) {
			if (err)
				res.send(err);

			res.json(messages);
		});
	});
	
// Routes ending in /messages/:message_id
// ---------------------------------------------------------------------------------------
router.route('/messages/:message_id')

    // getting the messages with a particular id (accessed at GET http://localhost:8080/api/messages/:message_id)
    .get(function(req, res) {
        Message.findById(req.params.message_id, function(err, message) {
            if (err)
                res.send(err);
            
			//Checking if our message is in palindrome using isPalindrome module
			if (isPalindrome(message.content)){
				var palMessage = JSON.parse(JSON.stringify(message));
				palMessage.Palindrome = 'Yes the message is in palindrome';
				res.json(palMessage);
			}
			else {
				var palMessage = JSON.parse(JSON.stringify(message));
				palMessage.Palindrome = 'No the message is not in palindrome';
				res.json(palMessage);
			}
            
        });
    })
    
    // updating the message with a particular id (accessed at PUT http://localhost:8080/api/messages/:message_id)
    .put(function(req, res) {

        // using our message model to find the message we require
        Message.findById(req.params.message_id, function(err, message) {

            if (err)
                res.send(err);

            message.content = req.body.content;  // updating the message contents

            // saving the message
            message.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'The message has been updated!' });
            });

        });
    })
    
    // deleting the message with a particular id (accessed at DELETE http://localhost:8080/api/messages/:message_id)
    .delete(function(req, res) {
        Message.remove({
            _id: req.params.message_id
        }, function(err, message) {
            if (err)
                res.send(err);

            res.json({ message: 'The message was successfully deleted' });
        });
    });


// --------------------REGISTER OUR ROUTES -----------------------------------------------
app.use('/api', router);  //all routes are prefixed with /api



// application -------------------------------------------------------------
app.get('*', function(req, res) {
	console.log('Homepage requested!');
    res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
// =====================STARTING THE SERVER=============================================//
app.listen(port);
console.log('Server is listening on http://localhost:' + port);