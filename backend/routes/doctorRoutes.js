const express = require("express"); const router = express.Router(); router.get("/", (req, res) => res.send("Doctors route")); module.exports = router;
