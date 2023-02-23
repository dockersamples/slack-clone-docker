import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import slackChannelModel from "./roomModel.js"; //dbmodel
import userModel from "./userModel.js";
import slackMessageModel from "./messageModel.js";
// app config
import cors from "cors";
const app = express();
const port = 9000;

//middle ware needed to parse json body

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// app.use((req,res,next) => {
//     // setting the response headers for open cors access
//     // res.setHeader("Access-Control-Allow-Origin", "*");
//     // res.setHeader("Access-Control-Allow-Headers", "*");
//     // next();

// })
// https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/13559534#overview
// db config
const connection = "mongodb://db:27017/slackchannels";
// const connection = "mongodb://localhost:27017/slackchannels";

mongoose
  .connect(connection, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch((err) => {
    console.log("error connecting to the database");
    console.log(err);
    process.exit();
  });

// run initially to populate database which is mounted locally
// record = json object

app.get("/", (req, res) => {
  console.log('connecting to route route "/"');
  res.status(200).send("Slack Clone");
});

app.post("/login", (req, res) => {
  const requestData = req.body;

  // searches for user if found return user data object, if not found then add user to database
  userModel.findOne(requestData, (err, data) => {
    if (!err) {
      if (data !== null) {
        console.log("Found user!!!!!!");
        console.log(data);
        res.status(201).send(data);
      } else if (data === null) {
        console.log("data was null user does not exist in db: creating");

        const user = {
          email: req.body.email,
          password: req.body.password,
          userImage: req.body.userImage,
        };
        console.log(user);

        const newUser = new userModel(user);

        newUser.save((err) => {
          if (!err) {
            console.log(`User ${user} has been registered`);

            res.status(202).send(user);
          } else {
            // there was an error
            res.status(400).send(err);
          }
        });
      }
    }
  });

  // res.status(200).send('Slack Clone')
});

app.get("/v1/channels/", (req, res) => {
  console.log('connecting to route route "/channels"');
  slackChannelModel.find((err, data) => {
    if (!err) {
      console.log(typeof data);

      console.log(data);

      // 201 -> created
      res.status(201).send(data);
    } else {
      console.log(err);
      res.status(500).send(err);
    }
  });
});

app.get("/v1/channels/find", (req, res) => {
  slackChannelModel.find((err, data) => {
    if (!err) {
      console.log(typeof data);

      console.log(data);

      // 201 -> created
      res.status(201).send(data);
    } else {
      console.log(err);
      res.status(500).send(err);
    }
  });
});

// add channel
app.post("/v1/channels/add", (req, res) => {
  const newChannel = req.body;

  slackChannelModel.create(newChannel, (err, data) => {
    if (!err) {
      console.log("Entry successful");
      console.log(newChannel);
      console.log(data);
      res.status(201).send(data);
    } else {
      console.log("Entry unsuccessful");
      console.log(err);
    }
  });
});

app.post("/v1/channels/getChannelDetail", (req, res) => {
  const requestData = req.body;

  slackChannelModel.findOne(requestData, (err, data) => {
    if (!err) {
      console.log(`${data} retreived from the database`);
      res.status(201).send(data);
    } else {
      console.log("There was an error locating data");
      console.log(err);
    }
  });
});

app.post("/newMessage", (req, res) => {
  const messageContent = {
    message: req.body.message,
    timeStamp: req.body.timeStamp,
    user: req.body.user,
    userImage: req.body.userImage,
    channelId: req.body.channelId,
  };

  const newMessage = new slackMessageModel(messageContent);

  newMessage.save((err) => {
    if (!err) {
      console.log(`${messageContent} has been saved successfully`);

      res.status(202).send(messageContent);
    } else {
      // there was an error
      res.status(400).send(err);
    }
  });
});

app.post("/v1/channels/findMessage", (req, res) => {
  const channel = req.body;

  slackMessageModel.find((err, data) => {
    if (!err) {
      console.log(typeof data);

      console.log(data);

      // 201 -> created
      res.status(201).send(data);
    } else {
      console.log(err);
      res.status(500).send(err);
    }
  });
});

app.get("/v1/channels/findMessage/:roomID", (req, res) => {
  const roomID = req.params.roomID;

  const query = {
    channelId: roomID,
  };

  slackMessageModel.find(query, (err, data) => {
    if (!err) {
      // console.log(typeof(data))

      // console.log(data)

      // 201 -> created
      res.status(201).send(data);
    } else {
      console.log(err);
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`Listening on port : ${port}`));

// docker run -p 27017:27017 -v /Users/ellarnol/localSlackDatabase:/data/db  mongo:latest
