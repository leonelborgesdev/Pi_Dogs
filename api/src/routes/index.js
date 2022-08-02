const { Router } = require("express");
const {
  getAllDogs,
  getDogById,
  addBreed,
  modifyBreed,
} = require("../controllers/DogsControllers");
const {
  getTemperaments,
  addTemperaments,
} = require("../controllers/TemperamentsControler");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/breeds", getAllDogs);
router.get("/breeds/:idBreed", getDogById);
router.get("/temperaments", getTemperaments);
router.post("/temperaments", addTemperaments);
router.post("/breeds", addBreed);
router.put("/breeds/:idBreed", modifyBreed);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router;
module.exports = router;
