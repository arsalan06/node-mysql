const { Book } = require("../models");

exports.addBook = async (req, res, next) => {
  console.log(req.body);
  try {
    // console.log(req.auth)
    const { title, authorId } = req.body;
    const newBook = await Book.create({ title, authorId });

    res.status(201).json({
      status: "success",
      data: {
        user: newBook,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "Fail",
      message: err,
    });
  }
};


exports.userBooks = async (req, res, next) => {
  console.log(req.body);
  try {
    // console.log(req.auth)
    const { title, authorId } = req.body;
    const newBook = await Book.create({ title, authorId });

    res.status(201).json({
      status: "success",
      data: {
        user: newBook,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "Fail",
      message: err,
    });
  }
};

