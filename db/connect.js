const mongooese = require("mongoose");

const connectDB = (url) => {
  return mongooese
    .connect(url)
    .then(() => console.log("データベースと接続中・・・"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;