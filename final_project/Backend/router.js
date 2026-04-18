const express = require("express");
const { handleRSVP } = require("./controller");

const router = express.Router();

router.post("/rsvp", handleRSVP);

module.exports = router;
