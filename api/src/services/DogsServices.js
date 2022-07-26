const axios = require("axios");
const { v4 } = require("uuid");
const { Temperament, Dog } = require("../db");

async function cargar_dogs_api(api) {
  const { data } = await axios(api);
  const vecObjTem = [];
  const vecBreedsTemp = [];
  const allDogs = data.map(async (elem) => {
    const breed = {
      id: elem.image.id,
      name: elem.name,
      height: elem.height.metric,
      weight: elem.weight.metric,
      life_span: elem.life_span,
      image: elem.image.url,
    };
    if (elem.temperament !== undefined && elem.temperament !== null) {
      const vecTemp = elem.temperament.split(",");
      const vecIdTemp = [];
      vecTemp.map((Temp) => {
        const elementTemp = Temp.trim();
        const value_vec = verificar_tempera(elementTemp, vecObjTem);
        if (value_vec[0]) {
          const ObjTemp = { id: v4(), name: elementTemp };
          vecObjTem.push(ObjTemp);
          vecIdTemp.push(ObjTemp.id);
        } else {
          vecIdTemp.push(value_vec[1]);
        }
      });
      //   const breeds1 = await Dog.create(breed);
      //   await breeds1.setTemperaments(vecIdTemp);
      //console.log(vecIdTemp, breed.name);
      vecBreedsTemp.push([vecIdTemp, breed]);
    } else {
      vecBreedsTemp.push([[], breed]);
    }
    return breed;
  });
  //console.log(vecBreedsTemp);
  await Temperament.bulkCreate(vecObjTem);
  return vecBreedsTemp;
}
function verificar_tempera(elementTemp, vecObjTem) {
  for (let i = 0; i < vecObjTem.length; i++) {
    const obj = vecObjTem[i];
    if (elementTemp === obj.name) {
      return [false, obj.id];
    }
  }
  return [true, ""];
}

module.exports = { cargar_dogs_api };
