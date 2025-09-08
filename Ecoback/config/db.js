import mongoose from "mongoose";

const conectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("db connected till config");
  });

  await mongoose.connect(`${process.env.MONGO_URI}e-comerce`);
  // await mongoose.connect(`mongodb://localhost:27017/e-comerce`);
};

export default conectDB;
