const dotenv = require("dotenv").config();

const envfound = dotenv;
// if (envfound.error) {
//   // this error should crash the whole process

//   throw new Error("⚠️  Couldn't find .env file  ⚠️");
// }
export default {
  /* 
  Your favourite port
   */
  port: parseInt(process.env.PORT, 10),
  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI,
  /**
   * Your secret sauce
   */
};
