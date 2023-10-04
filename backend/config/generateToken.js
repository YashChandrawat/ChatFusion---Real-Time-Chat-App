const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "dc7193f5eb942ef410750750629ba18703c8ddbece0322f17109fdd407a6a25a196c7cb980160a848a87838c558a3fc569b214c2a6a59e2275dc7555c75685a8", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
