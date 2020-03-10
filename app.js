const express = require('express');
const bodyParser = require('body-parser');
let middleware = require('./middleware');
let HandlerGenerator = require('./handlerGenerator');
let path = require('path');

// Starting point of the server
function main () {
  let app = express(); // Export app for other routes to use
  let handlers = new HandlerGenerator();
  const port = process.env.PORT || 8000;
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, 'public')));
  //APIs
  app.post('/api/login', handlers.login);

  // Routes & Handlers
  
  app.get('/', middleware.checkToken, handlers.index);
  
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();