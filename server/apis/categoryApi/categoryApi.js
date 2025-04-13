const express = require("express");
const { ObjectId } = require("mongodb");

const categoryApi = (categoryCollection) => {
  const router = express.Router();

  // Add a category
  router.post("/", async (req, res) => {
    const categoryInfo = req.body;
    categoryInfo.createdAt = new Date();
    const result = await categoryCollection.insertOne(categoryInfo);
    res.send(result);
  });

  // Get all categories data
  router.get("/", async (req, res) => {
    const result = await categoryCollection.find().toArray();
    res.send(result);
  });

  // Update a category by ID
  router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    try {
      const result = await categoryCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: "Failed to update category." });
    }
  });

  // Delete a category by ID
  router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const result = await categoryCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: "Failed to delete category." });
    }
  });

  return router;
};

module.exports = categoryApi;
