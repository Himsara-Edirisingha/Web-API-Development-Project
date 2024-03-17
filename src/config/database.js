const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://himsara789:systemusr56@dbwad.cg0tv8b.mongodb.net/whetherAPI?retryWrites=true&w=majority&appName=dbwad";

const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
};

mongoose
  .connect(mongoURI, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports = mongoose;
