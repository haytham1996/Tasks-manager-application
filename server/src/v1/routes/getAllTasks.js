const router = require("express").Router();
const taskController = require("../controllers/task");

// Route to get all tasks
router.get("/", taskController.getAll);

module.exports = router;
