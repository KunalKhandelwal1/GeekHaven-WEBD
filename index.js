import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import { connection } from "./connections.js";
import { fetchingData } from "./seed.js";
import CATEGORY from "./models/category.js";
import userRoute from "./Router/user.js";
import cookieParser from "cookie-parser";
import { checkForAuthenticationCookie } from "./middlewares/auth.js";
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

connection(process.env.MONGODB_URI);
app.use(cookieParser());
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use(checkForAuthenticationCookie("token"));
app.get("/seed", async (req, res) => {
  await fetchingData();
  res.send("Seeding completed ✅");
});

app.get("/title", async (req, res) => {
  try {
    const categories = await CATEGORY.find();
    res.render("title", { categories, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/title/:id", (req, res) => {
  res.redirect(`/${req.params.id}`);
});
app.use("/api/v1/auth", userRoute);
app.get("/dashboard", (req, res) => {
  res.render("dashboard", { user: req.user });
});
app.get("/:id", async (req, res) => {
  try {
    const category = await CATEGORY.findById(req.params.id).populate(
      "questions"
    );

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("questions", {
      Questions: category.questions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
