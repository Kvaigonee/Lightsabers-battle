const Router = require("express");
const router = new Router();
const singularController = require("../controllers/singulareController");

router.get("/", singularController.get);
router.post("/", singularController.post);

module.exports = router;
