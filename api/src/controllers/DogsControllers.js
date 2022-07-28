const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { v4 } = require("uuid");
const { cargar_dogs_api } = require("../services/DogsServices");

async function getAllDogs(req, res) {
  let { name } = req.query;
  try {
    const Lineas = await Dog.count();
    if (Lineas === 0) {
      const allDogs = await cargar_dogs_api(
        "https://api.thedogapi.com/v1/breeds"
      );
      await allDogs.map(async (elem) => {
        console.log(elem[0]);
        const breeds1 = await Dog.create(elem[1]);
        await breeds1.setTemperaments(elem[0]);
      });
    }
    if (name) {
      const DogDB = await Dog.findAll({
        include: Temperament,
        where: { name: { [Op.iLike]: `%${name}%` } },
      });
      return res.status(200).json(DogDB);
    }
    const dogsbd = await Dog.findAll({ include: Temperament });
    return res.status(200).json(dogsbd);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error });
  }
}
async function getDogById(req, res) {
  const Lineas = await Dog.count();
  const { idBreed } = req.params;
  try {
    if (Lineas === 0) {
      const allDogs = await cargar_dogs_api(
        "https://api.thedogapi.com/v1/breeds"
      );
      await allDogs.map(async (elem) => {
        console.log(elem[0]);
        const breeds1 = await Dog.create(elem[1]);
        await breeds1.setTemperaments(elem[0]);
      });
    }
    const dogBD = await Dog.findAll({
      include: Temperament,
      where: { id: idBreed },
    });
    return res.status(200).json(dogBD[0]);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
}
async function addBreed(req, res) {
  const { id, name, height, weight, life_span, temperaments } = req.body;
  let breed = { id, name, height, weight, life_span, image: "" };
  if (breed.name) {
    const breed1 = await Dog.create(dog);
    await breed1.setTemperaments(temperaments);
    return res.status(200).json(breed);
  } else {
    return res
      .status(404)
      .json({ message: "Ocurrio un error al insertar los datos" });
  }
}

module.exports = { getAllDogs, getDogById, addBreed };
