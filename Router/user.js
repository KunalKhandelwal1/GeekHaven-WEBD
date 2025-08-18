import express from "express";
const router = express.Router();
import USER from "../models/user.js";
import bcrypt from "bcrypt";
import { createToken } from "../services/auth.js";
const saltRounds = 10;
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  const entry = USER.find({ email: email });
  // console.log(name);
  bcrypt.hash(password, saltRounds, async function (err, hash) {

    await USER.create({
      name: name,
      email: email,
      password: hash,
    });
  });
  res.redirect("/api/v1/auth/login");
});
router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const entry = await USER.findOne({ email });
    if (!entry) return res.redirect("/api/v1/auth/register");

    const match = await bcrypt.compare(password, entry.password);
    if (match) {
      const token = createToken(entry);
      // console.log(token);
      return res.cookie("token", token).redirect("/title");
    } else {
      return res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).send("Server error");
  }
});
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/title");
});

export default router;
