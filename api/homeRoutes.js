const router = require("express").Router();

// get all users
router.get("/", (req, res) => {
  res.render("homepage");
});

module.exports = router;
