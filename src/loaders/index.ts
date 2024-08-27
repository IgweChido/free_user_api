// import Logger from './logger'
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
export default async ({ expressApp }) => {
  // mongoDB connection
  await mongooseLoader();
  // Injecting mongoose models into to DI container
  // import models

  await expressLoader({ app: expressApp });
  // add logger
};
