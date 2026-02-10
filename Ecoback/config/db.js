import mongoose from "mongoose";

const conectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("db connected till config");
  });

  const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/e-comerce";

  const dbName = process.env.DB_NAME || "e-comerce";
  const hasDatabaseInUri = /\/.+($|\?)/.test(mongoURI.replace(/^mongodb(\+srv)?:\/\//, ""));
  const connectionString = hasDatabaseInUri ? mongoURI : `${mongoURI.replace(/\/$/, "")}/${dbName}`;

  try {
    await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 5000 });
    return true;
  } catch (error) {
    console.error(`Mongo connection failed: ${error.message}`);
    return false;
  }
  // await mongoose.connect(`mongodb://localhost:27017/e-comerce`);
};

export default conectDB;
