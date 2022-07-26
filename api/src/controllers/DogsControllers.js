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
  const { id, name, height, weight, life_span, image, temperaments } = req.body;
  let breed = { id, name, height, weight, life_span, image };
  const breed_coincidence_name = await Dog.findAll({
    where: { name: breed.name },
  });
  console.log(breed.name, breed_coincidence_name.length);
  if (breed_coincidence_name.length > 0) {
    return res.json({
      ok: false,
      msg: `Ya existe una raza con el nombre ${breed.name}`,
    });
  }
  if (breed.name) {
    const breed1 = await Dog.create(breed);
    await breed1.setTemperaments(temperaments);
    return res.status(200).json(breed);
  } else {
    return res
      .status(404)
      .json({ message: "Ocurrio un error al insertar los datos" });
  }
}
async function modifyBreed(req, res) {
  const { idBreed } = req.params;
  const { id, ...breed } = req.body;

  try {
    if (breed.name) {
      const verificar_nombre = await Dog.findOne({
        where: {
          name: breed.name,
        },
      });
      if (verificar_nombre) {
        return res.status(400).json({
          ok: false,
          msg: `La raza ${breed.name} ya existe`,
        });
      }
    }
    await Dog.update(breed, {
      //modificando
      include: Temperament,
      where: {
        id: idBreed,
      },
    });
    const breedUpdate = await Dog.findOne({
      include: Temperament,
      where: { id: idBreed },
    });
    // await breedUpdate.removeTemperaments();
    if (breed.temperaments) {
      await breedUpdate.setTemperaments(breed.temperaments);
    }
    return res.status(201).json({ ok: true, msg: `Modificacion exitosa` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: `Hable con el Administrador`,
    });
  }
}
module.exports = { getAllDogs, getDogById, addBreed, modifyBreed };
