require("dotenv").config({ path: "./config.env" });
const mongoose = require('mongoose')
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
var cors = require('cors')
const bodyParser = require("body-parser");
const base64 = require("base-64");
const request = require('request');
const fs = require("fs");
const fsx = require("fs-extra");
const path = require("path");
const rimraf = require("rimraf");
const glob = require("glob");
const sanitize = require("sanitize-filename");
app.use(cors())
var fileupload = require('express-fileupload');
const courRoute = require('./routes/courRoute')
const resourceRoute = require('./routes/ressourceRoute')
const commantaireRoute = require('./routes/commentaire')
const workRoute = require('./routes/work')

mongoose.connect('mongodb+srv://allin:123@allin.wfzye.mongodb.net/allin?retryWrites=true&w=majority',
{useNewUrlParser: true,
useFindAndModify: false,
useCreateIndex: true,
useUnifiedTopology: true}
)
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)

})
db.once('open', () => {
  console.log('database connection established!')


});

app.use(express.json());

app.get("/", (req, res) => {
  const dirPath = base64.decode(req.query.path) || "";
console.log("dirpath",dirPath)
  fs.readdir(dirPath, (err, files) => {
    if (!files) {
      console.log("No Files");
      return res.json({});
    }

    let finalList = {};
    files.forEach(file => {
      try {
        const fullPath = `${dirPath}/${file}`;
        const isDirectory = fs.lstatSync(fullPath).isDirectory();
        let fileProperties = {
          [fullPath]: {
            name: file,
            path: fullPath,
            size: fs.statSync(fullPath).size,
            extension: path.extname(file),
            type: isDirectory ? "directory" : "file",
            isOpen: false,
            bookmarked: false
          }
        };

        if (isDirectory) {
          delete fileProperties[fullPath].extension;
          fileProperties[fullPath].children = {};
          finalList = { ...fileProperties, ...finalList };
        } else {
          finalList = { ...finalList, ...fileProperties };
        }
      } catch (error) {
        console.log("Error:", error);
        return res.json({});
      }
    });

    return res.json(finalList);
  });
});

app.get("/search", (req, res) => {
  const dirPath = base64.decode(req.query.path) || "";
  let query = base64.decode(req.query.query) || "";
  query = sanitize(query);
  const maxResults = 20;

  glob(`${dirPath}/**/*.*`, {}, function(er, files) {
    const final = [];
    let counter = 0;

    for (const file of files) {
      if (counter >= maxResults) {
        break;
      }

      let pattern;
      try {
        pattern = new RegExp(query, "gi");
      } catch (error) {
        query = query.replace(/[|&;$%@"<>()+,*]/g, "");
        pattern = new RegExp(query, "gi");
      }

      if (pattern.test(path.basename(file))) {
        final.push({
          name: path.basename(file),
          path: file,
          type: "file",
          extension: path.extname(file)
        });
        counter++;
      }
    }

    return res.json(final);
  });
});

app.post("/dragdrop", (req, res) => {
  const { source, destination, overwrite } = req.body;
  const filename = path.basename(source);
  const destinationPath = `${destination}${path.sep}${filename}`;

  fsx.move(source, destinationPath, { overwrite }, error => {
    if (error) {
      return res.status(400).send("NOT_OK");
    }

    return res.status(201).send("OK");
  });
});

app.put("/rename", (req, res) => {
  const { oldPath, newFileName } = req.body;
  const newFilePath = `${path.dirname(oldPath)}${path.sep}${sanitize(
    newFileName
  )}`;

  fsx.move(oldPath, newFilePath, { overwrite: false }, error => {
    if (error) {
      console.log("Error", error);
      return res.status(400).send("NOT_OK");
    }

    return res.json({
      newFilePath
    });
  });
});

app.delete("/", (req, res) => {
  rimraf(req.query.fullPath, () => {
    res.send("OK");
  });
});
app.post("/read",(req,res)=>{
  const pathdir= req.body.path;
  const fs = require('fs');
  var text = fs.readFileSync(pathdir,'utf8')
res.json({
  text
})});
app.post("/write",(req,res)=>{
  const fs = require('fs');
  const pathdir= req.body.path;
  const data = req.body.data;
  fs.writeFile(pathdir, data, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
      res.json({
        message:"success"
      })
  }); 
});

app.post("/compile",(req,res)=>{
  var request = require('request');
  

var accessToken = '4fad68c2a3f132443b2ea20a4093dc30';
var endpoint = 'cf883bdc.compilers.sphere-engine.com';
// define request parameters
var submissionData = {
  problemId: 42,
  compilerId: 11,
  source:'C:/Users/LEGION/Desktop/testreact/main.c'

};

// send request
request({
  url: 'https://' + endpoint + '/api/v4/submissions?access_token=' + accessToken,
  method: 'POST',
  form: submissionData
}, function (error, response, body) {
  
  if (error) {
      console.log('Connection problem');
  }
  
  // process response
  if (response) {
      if (response.statusCode === 201) {
          console.log(JSON.parse(response.body)); // submission data in JSON
      } else {
          if (response.statusCode === 401) {
              console.log('Invalid access token');
          } else if (response.statusCode === 402) {
              console.log('Unable to create submission');
          } else if (response.statusCode === 400) {
              var body = JSON.parse(response.body);
              console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
          }
      }
  }
});
})
app.get("/test",(req,res)=>{
  var request = require('request');

var accessToken = '4fad68c2a3f132443b2ea20a4093dc30';
var endpoint = 'cf883bdc.compilers.sphere-engine.com';
var submissionId = 337132388;

// send request
request({
    url: 'https://' + endpoint + '/api/v4/submissions/' + submissionId + '?access_token=' + accessToken,
    method: 'GET'
}, function (error, response, body) {
    
    if (error) {
        console.log('Connection problem');
    }
    
    // process response
    if (response) {
        if (response.statusCode === 200) {
            console.log(JSON.parse(response.body)); // submission data in JSON
        } else {
            if (response.statusCode === 401) {
                console.log('Invalid access token');
            } else if (response.statusCode === 403) {
                console.log('Access denied');
            } else if (response.statusCode === 404) {
                console.log('Submision not found');
            }
        }
    }
});

})
app.get("/listcomp",(req,res)=>{
  var request = require('request');

  var accessToken = '4fad68c2a3f132443b2ea20a4093dc30';
  var endpoint = 'cf883bdc.compilers.sphere-engine.com';

  var request = require('request');
  
  // send request
  request({
      url: 'https://' + endpoint + '/api/v4/compilers?access_token=' + accessToken,
      method: 'GET'
  }, function (error, response, body) {
      
      if (error) {
          console.log('Connection problem');
      }
      // var role = sessionStorage.getItem(role)
      // process response
      if (response) {
          if (response.statusCode === 200) {
              console.log(JSON.parse(response.body)); // list of compilers in JSON
          } else {
              if (response.statusCode === 401) {
                  console.log('Invalid access token');
              }
          }
      }
  });
})











app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

// Connecting Routes



app.use("/api/auth", require("./routes/auth"));
app.use("/api/", require("./routes/private"));
app.use('/api/images', require('./routes/images.route'));
app.use('/admin/', require('./routes/admin-routes'));
app.use('/admin/class', require('./routes/class-routes'));
app.use("/chatroom", require("./routes/chatroom"));
app.use('/api/cour', courRoute)
app.use('/api/resource', resourceRoute)
app.use('/api/commantaire', commantaireRoute)
app.use('/api/work', workRoute)

app.use(fileupload());
// Error Handler Middleware
app.use(errorHandler);
//Bring in the models
require("./models/User");
require("./models/Chatroom");
require("./models/Message");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const jwt = require("jsonwebtoken");

const Message = mongoose.model("Message");
const User = mongoose.model("User");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {}
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
});
