const express = require('express'); //requires the Express module
const app = express(); //sets up Express application

// app.use(express.static('public')) //configure the static assets path using a middleware function - for every request, run the function passed to app.use and use the directory as the start for static asset files
//express.static('public') defines the path to the static assets



const urlLogger = (request, response, next) => { //middleware function
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

app.use(urlLogger, timeLogger);
app.use(express.static('public'));//2222. middleware?

app.get('/', (request, response) => { //route handler for GET requests; 
  //callback takes a request object from client(headers, query parameters, body)
  //callback takes a response object to be sent to the client, includes info and functions
  // response.send('hello world'); //1111. sends a response with content in the body, 'hello world'
});

app.get('/json' , (request, response)=>{ //urlLogger will run only for this route
  response.status(200).json({"name":"Robbie"});
});

app.get('/sunsets', (request, response) => { //urlLogger will run only for this route
  response.links({
    next: 'https://www.google.com/search?q=sunset+pics&oq=sunset+pics&aqs=chrome..69i57.3495j0j1&sourceid=chrome&ie=UTF-8'
  });
});

app.listen(3000, () => { //server functionality: tells server to start listening for connections on a particular port
  console.log('Express intro running on localhost:3000') //logged in the terminal when the server is ready to listen for connections
});


