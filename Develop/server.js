const express = require('express');
const api_routes = require('./routes/api-routes');
const html_routes = require('./routes/html-routes');
const PORT = process.env.PORT || 3001;
const path = require('path');

const app = express();

// Middleware to parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serves static files to the public directory
app.use(express.static(path.join(__dirname, 'Develop', 'public')));

// Serves the css file
app.get('/public/assets/css/styles.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'public', 'assets', 'css', 'styles.css'));
  });

// Serves the Javascript file
app.get('/public/assets/js/index.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, 'public', 'assets', 'js', 'index.js'));
  });

// Server is using the api and home routes defined in the routes directory
app.use(api_routes);
app.use(html_routes);


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
