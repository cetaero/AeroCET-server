const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');  // <-- Added import for path


// Import routes
const galleryRoutes = require('./routes/gallery'); 
const contactRoutes = require('./routes/contact');  
const achievementsRoutes = require('./routes/achievements');  
const announcementsRoutes = require('./routes/announcements');  
const execomRoutes = require('./routes/execom');  
const workshopsRoutes = require('./routes/workshops');
const projectsRoutes = require('./routes/projects')

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', contactRoutes);
app.use('/api', galleryRoutes);
app.use('/api', achievementsRoutes);
app.use('/api', announcementsRoutes);
app.use('/api', execomRoutes);
app.use('/api', workshopsRoutes);
app.use('/api', projectsRoutes);

// Swagger 
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition:{
      openapi:"3.0.0",
      info:{
        title:"AeroCET API",
        version:"1.0.0",
        description:"API documentation for the AeroCET project",
      },
    },
    apis:["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>AeroCET Backend</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: rgb(255, 123, 0);
            font-family: Arial, sans-serif;
          }
          h1 {
            font-size: 5rem;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>AeroCET Backend</h1>
      </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api-docs`);
});
