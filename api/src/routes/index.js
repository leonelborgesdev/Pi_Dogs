const { Router } = require("express");
const {
  getAllDogs,
  getDogById,
  addDog,
} = require("../controllers/DogsControllers");
const { getTemperaments } = require("../controllers/TemperamentsControler");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/dogs", getAllDogs);
router.get("/dogs/:idDog", getDogById);
router.get("/temperaments", getTemperaments);
router.post("/dogs", addDog);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router;
module.exports = router;
