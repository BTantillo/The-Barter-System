const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

router.use("/", homeRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);


module.exports = router;
