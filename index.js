const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

//Forma de ler JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//rotas da API
const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);

//rota inicial / endpoint
app.get("/", (req, res) => {
  //mostrar req

  res.json({ message: "First route created! Congratulations!!!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
      process.env.DB_PASSWORD
    )}@api-node.9jvxh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB!");
    //entregar uma porta
    app.listen(3000);
  })
  .catch((err) => console.log(err));
