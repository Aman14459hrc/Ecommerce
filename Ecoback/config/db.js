import mongoose from "mongoose";

const conectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("db connected till config");
  });

  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("MONGO_URI is not configured");
  }

  const dbName = process.env.DB_NAME || "e-comerce";
  const hasDatabaseInUri = /\/.+($|\?)/.test(mongoURI.replace(/^mongodb(\+srv)?:\/\//, ""));
  const connectionString = hasDatabaseInUri ? mongoURI : `${mongoURI.replace(/\/$/, "")}/${dbName}`;

  await mongoose.connect(connectionString);
  // await mongoose.connect(`mongodb://localhost:27017/e-comerce`);
};

export default conectDB;
