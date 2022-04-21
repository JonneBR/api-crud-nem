const router = require("express").Router();

const Person = require("../models/Person");

// valid ObjectId = 41224d776a326fb40f000001

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

//Read
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  //extrair o dado da requisição, pela url = req.params
  const id = req.params.id;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      const person = await Person.findById(id);
      if (!person)
        return res.status(422).json({ message: "Nenhuma pessoa encontrada." });
      return res.status(200).json(person);
    } else {
      res.status(400).json({ message: "O id informado não é válido!" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Update - (PUT, PATCH)
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ message: "O id informado não é válido!" });

    const updatedPerson = await Person.findByIdAndUpdate(id, person);
    if (updatedPerson !== null) {
      return res.status(200).json({
        message: "Pessoa atualizada com sucesso!",
        updatedPerson: person,
      });
    } else {
      return res.status(422).json({ message: "Nenhuma pessoa encontrada." });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ message: "O id informado não é válido!" });

    const deletedPerson = await Person.findByIdAndDelete(id);

    if (deletedPerson !== null) {
      return res.status(200).json({
        message: "Pessoa deletada com sucesso!",
      });
    } else {
      return res.status(422).json({ message: "Nenhuma pessoa encontrada." });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
