import bodyParser from "body-parser";
import config from "./config";
const express = require("express");
const mongoose = require("mongoose");

async function startServer() {
  // declare express
  const app = express();

  console.log("it is working...");

  // get the loaders that gets other things
  await require("./loaders").default({ expressApp: app });

  app
    .listen(config.port, () => {
      // logger

      console.log(`
    ################################################
    🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
  `);
    })
    .on("error", (err) => {
      // logger
      console.log("error", err);
      process.exit(1);
    });
  // sending a message to the webpage
}

startServer();
