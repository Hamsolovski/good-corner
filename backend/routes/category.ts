import { Router } from "express";
import { Category } from "../entities/Category";

const categoriesRouter = Router();

categoriesRouter.get("/", async (req, res) => {
  try {
    const categories = await Category.find({
      relations: {
        ads: true,
      },
    });
    if (categories.length === 0) res.status(404).send("No category found");
    else res.json(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default categoriesRouter;
