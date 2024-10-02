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

app.put("/ad/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      title,
      description,
      owner,
      price,
      picture,
      location,
      createdAt,
      categoryId,
    } = req.body;
    const ad = await Ad.findOneBy({ id });
    if (!ad) res!.sendStatus(404);
    else {
      ad!.title = title;
      ad!.description = description;
      ad!.owner = owner;
      ad!.price = price;
      ad!.createdAt = createdAt;
      ad!.picture = picture;
      ad!.location = location;
      const category = await Category.findOneBy({ id: categoryId });
      if (category) ad.category = category;
      ad!.save();
      res.sendStatus(200);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`The Good Corner listening on port ${port}`);
});
