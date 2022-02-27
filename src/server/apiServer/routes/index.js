const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const singularRouter = require("./singularRouter");

router.use("/user", userRouter);
router.use("/singular", singularRouter);

module.exports = router;
