import express from "express";
import "reflect-metadata";
import { dataSource } from "./config/db";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { In } from "typeorm";

// APP INITIALISATION
const app = express();
const port = 3000;
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/ads', async (req, res) => {
    try {
        const categoryId = Number(req.query.category);
        let whereClause = {};
        if (categoryId) {
            whereClause = {
                category: {id: categoryId}
            }
        }
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
        console.log(tags)
    } catch (error) {
        console.log(error)
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
        console.log('tags', currentTags)
        tags.forEach((name: string) => {
            if (!(currentTags.find(tag => tag.name === name))) {
                const tag = new Tag();
                tag.name = name;
                tag.save();
            }
        });

        const ad = new Ad();
        ad.title = title;
        ad.description = description;
        ad.owner = owner;
        ad.price = price;
        ad.picture = picture;
        ad.location = location;
        ad.createdAt = createdAt;
        const category = await Category.findOneBy({ id: categoryId });
        if (category) ad.category = category;

        const tagList: Tag[] = [];
        const allTags = await Tag.find()
        tags.forEach((name:string) => {
            const t = allTags.find(tag => tag.name === name)
            console.log(t)
            if (t) tagList.push(t)
        })
        ad.tags = tagList;
        ad.save()
        res.status(200).send('Ad created !')
    } catch (error) {
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