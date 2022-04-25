require("dotenv").config({ path: "./config.env" });
const mongoose = require('mongoose')
const express = require("express");
const app = express();
let stream = require('./ws/stream')
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

const axios = require('axios');
var detectLang = require('lang-detector');
var fileupload = require('express-fileupload');
const courRoute = require('./routes/courRoute')
const resourceRoute = require('./routes/ressourceRoute')
const commantaireRoute = require('./routes/commentaire')
const workRoute = require('./routes/work')
let server = require('http').Server(app);
const io = require("socket.io")(server, {

})

const io2 = require("socket.io")(2001, {

})
var def;
var dataT;
var dataTT;
var stdinval;
var  pathdir;
var pathdirh;
var name="feferfer";
console.log("username====",name)
mongoose.connect('mongodb+srv://allin:123@allin.wfzye.mongodb.net/allin?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
)
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)

})
db.once('open', () => {
  console.log('database connection established!')


});

app.use(express.json());

io2.on('connection', socket => {
  console.log("connected");
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on("send-message", newValue => {
    socket.broadcast.emit("receive-message", newValue)
  })
});



app.get("/", (req, res) => {
  const dirPath = base64.decode(req.query.path) || "";
  console.log("dirpath", dirPath)
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

  glob(`${dirPath}/**/*.*`, {}, function (er, files) {
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
app.post("/read", (req, res) => {
   pathdir = req.body.path;
   pathdirh = req.body.path2;

  const fs = require('fs');
  var text = fs.readFileSync(pathdir, 'utf8')
  res.json({
    text
  })
});
app.post("/write",(req,res)=>{
  const fs = require('fs');
  const pathdir= req.body.path;
  console.log("path",pathdir)
  const data = req.body.data;
  console.log("data",data)
  fs.writeFile(pathdir, data, function(err) {
      if(err) {
        console.log("error in this functoin")
          return console.log(err);
      }
      console.log("The file was saved!");
      res.json({
        message:"success"
      })
  }); 
});
app.post("/stdin", (req, res) => {
  var log = req.body;
  console.log(log.data)
  stdinval = log.data;
})

app.post("/getname", (req, res) => {
  var log = req.body;
  name = log.data
  console.log(name)
  res.json({
    message: "done"
  })

})
app.get("/getna", (req, res) => {
  res.json({
    name
  })
})

app.get("/folder", (req, res) => {
  var datacomp = ""
  var languageC;
  var y = "";
  const directoryPath = "C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/work/" + name;
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      var filename = file
      fs.readFile("C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/work/" + name + "/" + file, 'utf8', (err, data) => {
        filename = filename.split('.')[0]

        if (err) {
          console.error(err)
          return


        }
        languageC = detectLang(data)
        if (languageC == "Python") {
          y = "python3";
        }
        if (languageC == "C++") {
          y = "c_cpp";
        }
        if (languageC == "Java") {
          y = "java";
        }
        if (languageC == "Javascript") {
          y = "nodejs";
        }
        var data = JSON.stringify({
          "script": data,
          "language": y,
          "clientId": "94c401bedab266b2b963465707a543d6",
          "clientSecret": "26dd5c86467ff7a6feb3e8a27ff824a22ad0836c36e3ef0ef599f8471cb6718c",
          "stdin": stdinval
        });

        var config = {
          method: 'post',
          url: 'https://api.jdoodle.com/v1/execute',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };

        axios(config)

          .then(function (response) {
            datacomp = datacomp + response.data.output;
            var filePath = 'C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/compilations/' + filename + '.txt';

            fs.writeFile(filePath, datacomp, (err, res) => {

              datacomp = "";

            });
          })
          .catch(function (error) {
            console.log(error);
          });


      })

    });
  });
  res.json({
    message: "done"
  })

})
app.post("/readcomp", (req, res) => {

  var log = req.body;
  console.log("file", log.data)
  var filePath = 'C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/compilations/' + log.data + '.txt';
  const buffer = fs.readFileSync(filePath);
  const fileContent = buffer.toString();

  res.json({
    fileContent
  })
})
app.post("/upbackend", (req, res) => {
  var re = req.body
  const directoryPath = re.data
  var foldername = "";
  foldername = directoryPath.substring(directoryPath.lastIndexOf("/") + 1);
  let dir = 'C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/work/' + name;
  console.log("dir", dir)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  foldername = directoryPath.substring(directoryPath.lastIndexOf("/") + 1);
  console.log(foldername)
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      fs.readFile(directoryPath + "/" + file, 'utf8', (err, data) => {
        var filePath = 'C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/work/' + name + "/" + file;
        console.log(filePath)


        fs.writeFile(filePath, data, err => {
          if (err) {
            console.error(err)
            return
          }
        })


      });
    });
  });
  res.json({
    message: "done"
  })
})
app.post("/changename", (req, res) => {
  var re = req.body
  var x = false
  const directoryPath = re.data

  var foldername = "";
  foldername = directoryPath.substring(directoryPath.lastIndexOf("/") + 1);
  console.log("foldername", foldername);

  var path = 'C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/work/';

  fs.readdir(path, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    console.log(files)
    files.forEach(el => {
      if (el == foldername) {
        return x = true
      }


    })
    return res.json({
      x
    })


  })

})
app.get("/filet", (req, res) => {
  var l;
  var fil = ""
  var filename = ""
  const directoryPath = "C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/compilations/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      fs.readFile(directoryPath + file, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        
        if ((data.indexOf("error") > -1)||(data.indexOf("public ") > -1)||(data.indexOf("Traceback") > -1)||(data.indexOf("Traceback") > -1)) {
          filename = file
          filename = filename.split('.')[0]

          fil = fil + filename + "\n";
          console.log(fil)
        }



        var filePath = 'C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/tmp.txt';


        fs.writeFile(filePath, fil, err => {
          if (err) {
            console.error(err)
            return
          }
        })
      })

    });

  });
  var filePath = 'C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/tmp.txt';
  const buffer = fs.readFileSync(filePath);
  const fileContent = buffer.toString();

  res.json({
    fileContent
  })


});
app.get("/filef", (req, res) => {
  var l;
  var fil = ""
  var filename = ""
  const directoryPath = "C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/compilations/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      fs.readFile(directoryPath + file, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        if ((data.indexOf("error") == -1)||(data.indexOf(" public") == -1)||(data.indexOf("Traceback") == -1)||(data.indexOf("errors") == -1)) {
          filename = file
          filename = filename.split('.')[0]

          fil = fil + filename + "\n";
          console.log(fil)
        }



        var filePath = 'C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/tmp.txt';


        fs.writeFile(filePath, fil, err => {
          if (err) {
            console.error(err)
            return
          }
        })
      })

    });

  });
  var filePath = 'C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/tmp.txt';
  const buffer = fs.readFileSync(filePath);
  const fileContent = buffer.toString();

  res.json({
    fileContent
  })


});


app.post("/statusT", (req, res) => {
  var x = req.body
  dataT = x.data;
  console.log("data", dataT)
  res.json({
    dataT
  })
})


app.get("/statusS", (req, res) => {

  console.log("datal", dataT)
  res.json({
    dataT
  })
})

app.get("/listaw", (req, res) => {
  var t = []
  var x = "false"
  var name = "student"

  t.push("student")
  if (t.indexOf("student") > -1) {
    x = "true"
  }
  res.json({
    x
  })
})

app.post("/statusTT", (req, res) => {
  var x = req.body
  dataTT = x.data;
  console.log("data", dataTT)
  res.json({
    dataTT
  })
})


app.get("/statusST", (req, res) => {

  console.log("datal", dataTT)
  res.json({
    dataTT
  })
})

app.get("/listawT", (req, res) => {
  var t = []
  var x = "false"
  var name = "student"

  t.push("student")
  if (t.indexOf("student") > -1) {
    x = "true"
  }
  res.json({
    x
  })
})

app.get("/pathy",(req,res)=>{
  const fs = require('fs')

  res.json({
    pathdir,
    def,
    pathdirh
  })
})
app.post("/def",(req,res)=>{
var message = req.body
def=message.data;
console.log("message",message)
console.log("def",def)
res.json({
  def
})
})

app.post("/readsingle",(req,res)=>{

  var log = req.body;
  console.log("file",log.data)
  var filePath=log.data;
    const buffer = fs.readFileSync(filePath);
    const fileContent = buffer.toString();

res.json({
fileContent})
})





app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

// Connecting Routes



app.use("/api/auth", require("./routes/auth"));
app.use("/api/", require("./routes/private"));
app.use('/api/images', require('./routes/images.route'));
app.use('/admin/', require('./routes/admin-routes'));
app.use('/admin/class', require('./routes/class-routes'));
app.use('/api/notifications/', require('./routes/notifications-route'));

app.use('/api/cour', courRoute)
app.use('/api/resource', resourceRoute)
app.use('/api/commantaire', commantaireRoute)
app.use('/api/work', workRoute)


app.use(fileupload());
// Error Handler Middleware
app.use(errorHandler);
//Bring in the models
require("./models/User");

require("./models/Message");
require("./models/ressource")

const PORT = process.env.PORT || 5000;
io.on('connection',stream)
server.listen(5000);
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});




