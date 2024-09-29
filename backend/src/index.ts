import express from "express";
import "reflect-metadata";
import { dataSource } from "./config/db";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";

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
            },
            where: whereClause
        })
        if (ads.length === 0) res.status(404).send('No ad found')
        else res.json(ads)
    } catch (error) {
        res.sendStatus(500).send(error)
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
        
    }
})

app.get('/ad/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const [ad] = await Ad.find({
            relations: {
                category: true,
            },
            where: {
                id: id
            }
        })
        if (!ad) res.status(404).send('No ad found')
        else res.json(ad)
    } catch (error) {
        res.sendStatus(500).send(error)
    }
})

app.post('/ads', async (req, res) => {
    try {
        const {title, description, owner, price, picture, location, createdAt, categoryId} = req.body;
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