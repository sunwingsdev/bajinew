const express = require("express");
const { ObjectId } = require("mongodb");

const subCategoryApi = (subCategoryCollection) => {
  const router = express.Router();

  // Add a sub category
  router.post("/", async (req, res) => {
    const subCategoryInfo = req.body;
    subCategoryInfo.createdAt = new Date();
    const result = await subCategoryCollection.insertOne(subCategoryInfo);
    res.send(result);
  });

  // Get all sub categories data
  router.get("/", async (req, res) => {
    const result = await subCategoryCollection.find().toArray();
    res.send(result);
  });

  // Update a sub-category
  router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const updatedInfo = req.body;
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        ...updatedInfo,
        updatedAt: new Date(),
      },
    };

    const result = await subCategoryCollection.updateOne(filter, updateDoc);
    res.send(result);
  });

  // Delete a sub-category
  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await subCategoryCollection.deleteOne(filter);
    res.send(result);
  });

  return router;
};

module.exports = subCategoryApi;
