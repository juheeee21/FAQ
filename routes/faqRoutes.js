const express = require("express");
const { cacheMiddleware } = require("../utils/cache");
const { GetFaq, PostFaq, DeleteFaqById } = require("../controllers/faqControllers");

const router = express.Router();

router.get("/", cacheMiddleware, GetFaq);
router.post("/", PostFaq);
router.delete("/:id", DeleteFaqById);

module.exports = router;