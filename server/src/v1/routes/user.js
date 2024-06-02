const { getAll } = require("../controllers/user");
const userController = require("../controllers/user");

const router = require("express").Router({ mergeParams: true });

router.get("/", getAll);
router.delete("/:id", userController.delete);

module.exports = router;
