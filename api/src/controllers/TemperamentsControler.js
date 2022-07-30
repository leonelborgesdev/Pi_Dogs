const { Temperament } = require("../db");
const { Op } = require("sequelize");

async function getTemperaments(req, res) {
  const { name } = req.query;
  try {
    if (name) {
      const Temperamentsbd = await Temperament.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });
      return res.status(200).json(Temperamentsbd);
    }
    const Temperamentsbd = await Temperament.findAll();
    if (Temperamentsbd.length > 0) {
      return res.status(200).json(Temperamentsbd);
    } else {
      return res.status(404);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error });
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
