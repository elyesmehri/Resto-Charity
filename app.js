// server.js
const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const twig = require('twig');
const bodyParser = require ('body-parser');

const usersRoutes = require('./roots/users_roots');

// Load MongoDB configuration from db.json
const mongoConfig = require('./config/db.json');
const { url: mongoURL } = mongoConfig;

// Create Express app
const app = express();
const server = http.createServer(app);

const { addclientsocket ,
        checkClient} = require("./controllers/users_controller");

// Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes setup...
app.use('/users', usersRoutes);  

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));



// Define a route to render your Twig template
app.get('/', (req, res) => {
  
  res.render('chat.twig');

});

// Define a route for /signin
app.get('/signin', (req, res) => {
  res.render('signin.twig');
});


const io = require("socket.io")(server);

io.on('connection', (socket) => {

  console.log('A user connected');

  socket.on("inscri", (data) => {
    // Log the data as JSON
    console.log(JSON.stringify(data));

    // Assuming `addOne` is a function you've defined elsewhere
    addclientsocket (data);

    // Emit the data back to all connected clients
    io.emit("inscri", data);

  });

  socket.on("signin", async (data) => {

    try {
        // Log the data as JSON
        console.log(JSON.stringify(data));

        // Perform sign-in check
        checkClient(data);

        // Emit the result back to the client
        socket.emit("signinResult");



    } catch (error) {
        console.error(error);
    }
});

  socket.on('disconnect', () => {

      console.log('User disconnected');
  });
});


// Start the server
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
