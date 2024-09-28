import express from "express";
import {Request, Response, NextFunction} from 'express';
import sqlite3 from 'sqlite3';

// APP INITIALISATION
const app = express();
const port = 3000;
app.use(express.json());

// DB INITIALISATION
const db = new sqlite3.Database('./database/db.sqlite')



app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
})

app.get('/ads', (req, res) => {
    db.all("SELECT * FROM ad", (err, rows) => {
        if (err) return res.status(500).send(err)
        else return res.send(rows);
    })
})

app.get('/ad/:id', (req, res) => {
    db.all("SELECT * FROM ad WHERE id = ?", req.params.id, (err, rows) => {
        if (err) return res.status(500).send(err)
        else if (rows.length === 0) return res.sendStatus(404);
        else return res.send(rows)
    })

})

app.post('/ads', (req, res) => {
    const {title, description, owner, price, picture, location, createdAt} = req.body;
    db.run("INSERT INTO ad (title, description, owner, price, picture, location, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, description, owner, price, picture, location, createdAt], (err) => {
            if (err) return res.status(500).send(err)
            else return res.sendStatus(200)
        }
    )
})

app.delete('/ad/:id', (req, res) => {
    let id = Number(req.params.id)
    db.run("DELETE FROM ad WHERE id = ?", id, (err) => {
        if (err) return res.status(500).send(err)
        else return res.sendStatus(204)
    })
})

app.put('/ad/:id', (req, res) => {
    let id = Number(req.params.id)
    const {title, description, owner, price, picture, location, createdAt} = req.body;
    db.run("UPDATE ad SET title = ?, description = ?, owner = ?, price = ?, picture = ?, location = ?, createdAt = ? WHERE id = ?", 
        [title, description, owner, price, picture, location, createdAt, id], (err) => {
            if (err) return res.status(500).send(err)
            else return res.send(200)
        }
    )
})



    



app.listen(port, () => {
    console.log(`The Good Corner listening on port ${port}`)
})