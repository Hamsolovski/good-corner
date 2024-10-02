import express from "express";
import "reflect-metadata";
import { dataSource } from "./config/db";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import cors from "cors";

// APP INITIALISATION
const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/ads', async (req, res) => {
    try {
        const categoryId = Number(req.query.category);
        const tagId = Number(req.query.tag);
        let whereClause: Record<string,any> = {};
        if (categoryId) whereClause.category = {id: categoryId}
        if (tagId) whereClause.tags = {id: tagId}
        const ads = await Ad.find({
            relations: {
                category: true,
                tags: true,
            },
            where: whereClause
        })
        if (ads.length === 0) res.status(404).send('No ad found')
        else res.json(ads)
    } catch (error) {
        res.status(500).send(error)
    }

})

app.get('/categories', async(req, res) => {
    try {
        const categories = await Category.find({
            relations: {
                ads: true,
            }
        })
        if (categories.length === 0) res.status(404).send('No category found')
        else res.json(categories)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/tags', async(req, res) => {
    try {
        const tags = await Tag.find()
        if (tags.length === 0) res.status(404).send('No tag found')
        else res.json(tags)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/ad/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const [ad] = await Ad.find({
            relations: {
                category: true,
                tags: true
            },
            where: {
                id: id
            }
        })
        if (!ad) res.status(404).send('No ad found')
        else res.json(ad)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/ads', async (req, res) => {
    try {
        const {title, description, owner, price, picture, location, createdAt, categoryId, tags} = req.body;
        const currentTags = await Tag.find()
        const tagsToSave: Tag[] = []
        if (tags) tags.forEach((name: string) => {
            if (!(currentTags.find(tag => tag.name === name))) {
                const tag = new Tag();
                tag.name = name;
                tagsToSave.push(tag);
            }
        })
        await Tag.save(tagsToSave);

        const ad = new Ad();
        ad.title = title;
        ad.description = description;
        ad.owner = owner;
        ad.price = Number(price);
        ad.picture = "https://www.l214.com/wp-content/uploads/2021/06/vache-meugle-1024x535.jpg";
        ad.location = location;
        ad.createdAt = new Date().toDateString();
        const category = await Category.findOneBy({ id: categoryId });
        if (category) ad.category = category;

        const tagList: Tag[] = [];
        const allTags = await Tag.find()
        if (tags) tags.forEach((name:string) => {
            const t = allTags.find(tag => tag.name === name)
            if (t) tagList.push(t)
        })
        ad.tags = tagList;
        ad.save()
        res.status(200).send('Ad created !')
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

app.delete('/ad/:id', async (req, res) => {
    try {
        let id = Number(req.params.id)
        const ad = await Ad.findOneBy({ id })
        if (!ad) res.status(404).send('No ad found')
        else {
            ad.remove()
            res.status(204).send('Ad deleted !')
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete('/tag/:id', async (req, res) => {
    try {
        let id = Number(req.params.id)
        const tag = await Tag.findOneBy({ id })
        if (!tag) res.status(404).send('No tag found')
        else {
            let name = tag.name
            tag.remove()
            res.status(204).send(`Tag ${name} deleted !`)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/ad/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const {title, description, owner, price, picture, location, createdAt, categoryId} = req.body;
        const ad = await Ad.findOneBy({ id })
        if (!ad) res!.sendStatus(404)
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
            res.sendStatus(200)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})


app.listen(port, async () => {
    await dataSource.initialize();
    console.log(`The Good Corner listening on port ${port}`)
})