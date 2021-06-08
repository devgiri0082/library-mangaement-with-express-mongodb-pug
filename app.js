let express = require("express");
let mongoose = require("mongoose");
let morgan = require("morgan");
const { showBooks, addBook } = require("./Controller/BookController");
const { listAllGenre } = require("./Controller/CategoriesController");
(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();
const app = express();
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
//importing routes
const bookRouter = require("./routes/books");

app
  .route("/")
  .get(async (req, res) => {
    let data = await showBooks();
    console.log(data);
    res.render("index", { message: data });
  })
  .post(async (req, res) => {
    let { title, price, genre, authors } = req.body;
    // console.log(title, price, genre, authors, "Hello");
    await addBook(title, price, genre, authors.split(", "));
    let data = await showBooks();
    res.render("index", { message: data });
  });
app.get("/new-Book", async (req, res) => {
  let genres = await listAllGenre();
  let onlyGenres = genres.map((elem) => elem.title);
  console.log(onlyGenres);
  res.render("form", { genres: onlyGenres });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listening at port 3000");
});
