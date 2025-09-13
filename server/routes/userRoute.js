const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  updatePassword,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getCurrentUser);
router.put("/update", authMiddleware, updateProfile);
router.put("/update-password", authMiddleware, updatePassword);

module.exports = router;
