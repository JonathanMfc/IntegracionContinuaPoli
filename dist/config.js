"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MONGODB_URI = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://jonathancastillo:mCjBTsQrQ6Ez1X8C@cluster0.judk9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
exports.MONGODB_URI = MONGODB_URI;