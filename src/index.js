const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
});

const Item = sequelize.define("Item", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
});

(async () => {
    await sequelize.sync();
})();

const app = express();
app.use(express.json());

app.post("/items", async (req, res) => {
    const item = await Item.create(req.body);
    res.status(201).json(item);
});

app.get("/items", async (req, res) => {
    const items = await Item.findAll();
    res.json(items);
});

app.put("/items/:id", async (req, res) => {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).send("Not found");
    await item.update(req.body);
    res.json(item);
});

app.delete("/items/:id", async (req, res) => {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).send("Not found");
    await item.destroy();
    res.sendStatus(204);
});

app.listen(3000, () => console.log("Running on 3000"));
