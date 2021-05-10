const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.use(express.json());

const fs = require('fs');

const inventory = require('./inventory.json');
//const html = require('./index.html');

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/api/inventory", (req, res) => {
    res.send(inventory);
});

app.get('/api/inventory/:name', (req, res) => {
    const item = inventory.find(i => i.name == req.params.name);
    if(!item) {
        res.status(404).send('Item was not found');
    }
    res.send(item);
});

app.post("/api/inventory", (req, res) => {
    const item = {
        id: inventory.length + 1,
        name: req.body.name,
        stock: req.body.stock
    };
    const obj = JSON.stringify(item);
    fs.appendFile("inventory.json", obj, (err) => {
        if (err) throw err;
        res.send(item);
    })
});

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});