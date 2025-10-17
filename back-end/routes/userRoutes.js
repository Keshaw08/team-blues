const express = require("express");
const router = express.Router();
const {
  listUsers,
  updateUser,
  deleteUser,
  summary,
} = require("../controllers/userController");

router.get("/", listUsers);
router.get("/summary", summary);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
