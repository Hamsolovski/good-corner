import { Router } from "express";
import { Ad } from "../entities/Ad";
import { Tag } from "../entities/Tag";
import { Category } from "../entities/Category";

const adsRouter = Router();

adsRouter.get("/", async (req, res) => {
  try {
    const categoryId = Number(req.query.category);
    const tagId = Number(req.query.tag);
    let whereClause: Record<string, any> = {};
    if (categoryId) whereClause.category = { id: categoryId };
    if (tagId) whereClause.tags = { id: tagId };
    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
      where: whereClause,
    });
    if (ads.length === 0) res.status(404).send("No ad found");
    else res.json(ads);
  } catch (error) {
    res.status(500).send(error);
  }
});

adsRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [ad] = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
      where: {
        id: id,
      },
    });
    if (!ad) res.status(404).send("No ad found");
    else res.json(ad);
  } catch (error) {
    res.status(500).send(error);
  }
});

adsRouter.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      owner,
      price,
      location,
      categoryId,
      tags,
    } = req.body;
    const currentTags = await Tag.find();
    const tagsToSave: Tag[] = [];
    if (tags) {
      tags.split(", ").forEach((name: string) => {
        if (!currentTags.find((tag) => tag.name === name)) {
          const tag = new Tag();
          tag.name = name;
          tagsToSave.push(tag);
        }
      });
    }
    await Tag.save(tagsToSave);

    const ad = new Ad();
    ad.title = title;
    ad.description = description;
    ad.owner = owner;
    ad.price = Number(price);
    ad.picture =
      "https://www.l214.com/wp-content/uploads/2021/06/vache-meugle-1024x535.jpg";
    ad.location = location;
    ad.createdAt = new Date().toDateString();
    const category = await Category.findOneBy({ id: categoryId });
    if (category) ad.category = category;

    const tagList: Tag[] = [];
    const allTags = await Tag.find();
    if (tags) {
      tags.split(", ").forEach((name: string) => {
        const t = allTags.find((tag) => tag.name === name);
        if (t) tagList.push(t);
      });
    }
    ad.tags = tagList;
    ad.save();
    res.status(200).send("Ad created !");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

adsRouter.delete("/:id", async (req, res) => {
  try {
    let id = Number(req.params.id);
    const ad = await Ad.findOneBy({ id });
    if (!ad) res.status(404).send("No ad found");
    else {
      ad.remove();
      res.status(204).send("Ad deleted !");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default adsRouter;
