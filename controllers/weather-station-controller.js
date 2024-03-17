const WeatherStation = require("../models/weatherstationModel");

let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

async function create(req, res) {
  const newitem = req.body;
  items.push(newitem);
  res.send(items);
}

async function get(req, res) {
  res.send("<h1> get </h1>");
}

async function getbyid(req, res) {
  res.send("<h1> getbyid </h1>");
}

async function remove(req, res) {
  const id = req.params.id;
  items = items.filter((item) => item.id !== parseInt(id));
  res.send(items);
}

async function update(req, res) {
    const id = req.params.id;
    const updatedItem = req.body;

    const index = items.findIndex(item => item.id === parseInt(id));

    if (index !== -1) {
        items[index] = { ...items[index], ...updatedItem };
        res.send(items);
    } else {
        res.status(404).send("Item not found");
    }
}


module.exports = {
  get: get,
  getbyid: getbyid,
  create: create,
  remove: remove,
  update: update,
};
