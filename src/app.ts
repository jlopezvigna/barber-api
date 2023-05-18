import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { AppDataSource } from "./config/AppDataSource";
import app from "./config/express";

dotenv.config();
const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then((aa) => {
    // here you can start to work with your database
    console.log("DataBase connected sucessfully!");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
