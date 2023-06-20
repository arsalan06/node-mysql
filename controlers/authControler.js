const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};
exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = await User.create({ firstName, lastName, email, password });
    const token = signToken(newUser.id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({
        status: "Error",
        message: "please provide email or password",
      });
    } else if (email && password) {
      const user = await User.findOne({ where: { email: email } });
console.log("user exist", user.dataValues)
      const correct = await correctPassword(password, user.dataValues.password);
      console.log("after password check", user)
      if (!user || !correct) {
        res.status(401).json({
          status: "Error",
          message: "please provide valid email or password",
        });
      }
      const token = signToken(user.id);

      res.status(201).json({
        status: "success",
        token,
        data: {
          user,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "Fail",
      message: err,
    });
  }
};
