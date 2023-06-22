const bookControler = require("../controlers/bookControler");
const express = require("express");
const bookRouter = express.Router();
const {verifyToken} = require("../midleware/verifyToken")
const { addBook } = bookControler;

bookRouter.post("/add-book",verifyToken, addBook);

module.exports = bookRouter
