const router = require("express").Router();

const Person = require("../models/Person");

router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome é obrigatório!" });
  }

  const person = {
    name,
    salary,
    approved,
  };

  //create
  try {
    //criando dados
    await Person.create(person);
    res.status(201).json({ message: "Pessoa cadastrada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
