const mongoose = require("mongoose")
const PATH =
  "mongodb+srv://gaikwadvipul196:Chat123@cluster0.0zocwck.mongodb.net/"

const connectMongoDB = async () => {
  try {
    await mongoose.connect(PATH)
    console.log("connect mongodb")
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectMongoDB

