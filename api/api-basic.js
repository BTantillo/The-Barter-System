//!Definitions and requirements
const router = require("express").Router();
//connect to proper requirements

//TAKEN FROM comment-route.js
//!Search for AAA and replace
router.get("/", (req, res) => {
  Comment.findAll()
    .then((AAA) => res.json(AAA))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  AAA.create({
    AAA,
  })
    .then((AAA) => res.json(AAA))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  AAAMODEL.destroy({
    where: {
      //!Unique identifier
      AAA,
    },
  })
    //Response - db
    .then((AAA) => {
      if (!AAA) {
        res.status(404).json({ message: "No AAA found with this id!" });
        return;
      }
      res.json(AAA);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//!export the modules
module.exports = router;
