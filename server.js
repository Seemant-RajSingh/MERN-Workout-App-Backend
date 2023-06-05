require('dotenv').config()    //requiring dotenv so port number can be shared from .env file
const exp = require('express');

const app = exp();

const wr = require('./routes/workouts')     //method to require external routes as modules**
const mong = require('mongoose')


//middleware
// When a request is received by the server, the exp.json() middleware parses the request body and converts it into a JavaScript object
// values of load, title and reps sent from front end with each request as json will be accessible in the request handler as req.body.load, req.body.title, and req.body.reps, respectively.
app.use(exp.json())


//if user makes a get/post requests on a particular path, the path and the method will be displayed in console before any response to the request is actually sent (eg. if get req on /, console: / GET). next() must be invoked else flow of execution will never leave app.use
app.use((req, res, next) => {
console.log(req.path, req.method);
next();
})


/*  route response, just to check api response, app.use is actually used as shown below this comment
app.get("/", (req, res)=> {
    res.json({mssg: "Welcome to the app"})
})  */

// ** CONVENTIONALLY DESIGNED FETCHING LINK - we use (fetch('/api/workouts') to fetch data in frontend, may use anything else)
app.use('/api/workouts', wr)    // calls exported get/post/etc. request responses from workouts.js



//connect to db via link
mong.connect(process.env.MONG_URI)
.then(() => {
    //listen for request as per promise: if connection to database established, start server on port specified in .env
app.listen(process.env.PORT, function() {
    console.log("server listenig on port specified");
});     //process is a global object in node, can be used to access .env variables as shown, here PORT is accessed from .env file
})
.catch((error) => {
    console.log(error)
})






// By specifying app.use('/api/workouts', wr), you are instructing Express to use the wr router module for any requests that start with '/api/workouts'. This means that when a request is made to a path like '/api/workouts', Express will pass the request through the exp.json() middleware first to parse the JSON data, and then it will be forwarded to the routes defined in the wr router module for further handling based on the request's HTTP method and path.