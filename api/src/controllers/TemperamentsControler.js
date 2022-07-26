const { Temperament } = require("../db");

async function getTemperaments(res, req) {
  const Temperamentsbd = await Temperament.findAll();
  if (Temperamentsbd.length > 0) {
    return res.status(200).json(Temperamentsbd);
  } else {
    return res
      .status(404)
      .json({ message: "No se encontro temperamentos en la bd" });
  }
}
async function addTemperaments(res, req) {
  const { id, name } = req.body;
}

module.exports = { getTemperaments };
