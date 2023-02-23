import mongoose from "mongoose";

// create a schema object
const slackSchema = mongoose.Schema({
  id: Number,
  name: String,
});

// Collection inside of the db
export default mongoose.model("slackChannels", slackSchema);
