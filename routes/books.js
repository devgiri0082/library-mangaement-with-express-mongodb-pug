const express = require("express");

const router = express.Router();
let printData = (req, res, next) => {
  console.log(req.url);
  next();
};

let showData = (req, res) => {
  res.send("Hello");
};

router
  .route("/")
  .get([printData, showData])
  .post((req, res) => {
    res.send("Add new books");
  });

let BookIdHandler1 = (req, res) => {
  let id = req.params.id;
  res.send(`Book id is ${id}`);
};

router.get("/:booksId", [BookIdHandler1]);

module.exports = router;
