const { Temperament } = require("../db");

async function getTemperaments(req, res) {
  const Temperamentsbd = await Temperament.findAll();
  if (Temperamentsbd.length > 0) {
    return res.status(200).json(Temperamentsbd);
  } else {
    return res.status(404);
  }
}
async function addTemperaments(req, res) {
  const { id, name } = req.body;
  let temperament = { id, name };
  if (temperament.name) {
    await Temperament.create(temperament);
    return res.status(200).json(temperament);
  } else {
    return res
      .status(404)
      .json({ message: "Ocurrio un error al insertar temperamento" });
  }
}

module.exports = { getTemperaments, addTemperaments };
