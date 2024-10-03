import express from "express";
import "reflect-metadata";
import { dataSource } from "./config/db";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import cors from "cors";
import adsRouter from "../routes/ad";
import tagsRouter from "../routes/tag";
import categoriesRouter from "../routes/category";


// APP INITIALISATION
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/ads', adsRouter)
app.use('/tags', tagsRouter)
app.use('/categories', categoriesRouter)


app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`The Good Corner listening on port ${port}`);
});
