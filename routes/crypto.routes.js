const express = require("express"); // llega la hora de usar Express porque necesito rutas

// El modelo que servirá de base para las rutas
const { Crypto } = require("../models/Crypto.js");

// Router
const router = express.Router();

// CRUD: READ
// EJEMPLO DE REQ: http://localhost:3000/crypto?page=1&limit=10
router.get("/", async (req, res) => {
  try {
    // Asi leemos query params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const cryptos = await Crypto.find()
      .limit(limit)
      .skip((page - 1) * limit);

    // LIMIT 10, PAGE 1 -> SKIP = 0
    // LIMIT 10, PAGE 2 -> SKIP = 10
    // LIMIT 10, PAGE 3 -> SKIP = 20
    // ...

    // Num total de elementos
    const totalElements = await Crypto.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: cryptos,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: READ
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const crypto = await Crypto.findById(id);
    if (crypto) {
      res.json(crypto);
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Creando una crypto
// CRUD: CREATE
router.post("/", async (req, res) => {
  try {
    const crypto = new Crypto({
      name: req.body.firstName,
      price: req.body.lastName,
      marketCap: req.body.phone,
      createdAt: req.body.createdAt,
    });

    const createdCrypto = await crypto.save();
    return res.status(201).json(createdCrypto);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Actualizando una crypto
// CRUD: UPDATE
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cryptoUpdated = await Crypto.findByIdAndUpdate(id, req.body, { new: true });
    if (cryptoUpdated) {
      res.json(cryptoUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Eliminando una crypto
// CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cryptoDeleted = await Crypto.findByIdAndDelete(id);
    if (cryptoDeleted) {
      res.json(cryptoDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Aquí empiezan los custom endpoints
router.get("/name/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const crypto = await Crypto.find({ name: new RegExp("^" + name.toLowerCase(), "i") });
    if (crypto?.length) {
      res.json(crypto);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { cryptoRouter: router };
