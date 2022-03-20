const express = require("express");
const router = express.Router();

const lannisterController = require("../controllers/lannister")

router.post("/post", lannisterController.createPost)

router.get("/get", lannisterController.getPost)

module.exports = router;