const express = require("express");
const router = express.Router();

// Require controller modules.
const showController = require("../controllers/showController");
const songController = require("../controllers/songController");

router.use('/shows', showController);
router.use('/songs', songController);

module.exports = router;
 