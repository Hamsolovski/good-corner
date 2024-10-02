import { Router } from "express";
import { Tag } from "../entities/Tag";

const tagsRouter = Router();

tagsRouter.get("/", async (req, res) => {
    try {
      const tags = await Tag.find({
        relations: {
          ads: true,
        }
      });
      if (tags.length === 0) res.status(404).send("No tag found");
      else res.json(tags);
    } catch (error) {
      res.status(500).send(error);
    }
  });


tagsRouter.delete("/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const tag = await Tag.findOne({ 
        relations: {
          ads: true,
        },
        where: {
          id: id,
        } 
      });
      if (!tag) res.status(404).send("No tag found");
      else {
        let name = tag.name;
        tag.remove();
        res.status(204).send(`Tag ${name} deleted !`);
      }
    } catch (error) {
      console.error(error)
      res.status(500).send(error);
    }
  });

export default tagsRouter;