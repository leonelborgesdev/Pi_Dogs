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

router.get("/breeds", getAllDogs);
router.get("/breed/:idBreed", getDogById);
router.get("/temperaments", getTemperaments);
router.post("/breeds", addDog);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router;
module.exports = router;
