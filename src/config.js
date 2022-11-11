import { config } from "dotenv";

config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://jonathancastillo:mCjBTsQrQ6Ez1X8C@cluster0.judk9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
