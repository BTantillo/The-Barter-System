const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment, Vote } = require("../../models");
const withAuth = require("../../utils/auth");
const multer  = require('multer');
const path = require("path");

//!Incoming comment, When you do your pull this file will be heavily edited.
//!At some point the routes were duplicated. I removed the duplicates that did not integrate  withAuth
//!These routes including file upload work for me.

//Multer setup STARTS

// Sets the storage constant to upload files into the upload folder.
// Files are being stored through express not into the db.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/upload"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //file.original name retains the original file name
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
//Multer setup ENDS

//Multer Ends
router.post("/newpost", upload.single("uploaded_file"),(req, res) =>{
  console.log(req.file)
  console.log(req.body)
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    file_name: req.file.destination,
    user_id: req.session.user_id,
  })
  .then((dbPostData) => res.json(dbPostData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})


router.post("/stats", withAuth, upload.single("uploaded_file"),
  function (req, res) {
    console.log("original /stats route");
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      file_name: req.file,
      user_id: req.session.user_id,
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });

    console.log(
      req.file,
      req.body.title,
      req.body.post_url,
      req.session.user_id
    );
    console.log("#2", dbPostData);
  }
);

// get all users
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    attributes: [
      "id",
      "post_url",
      "title",
      "description",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "description", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "post_url",
      "title",
      "description",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "description", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, upload.single("uploaded_file"), (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  console.log("original Post route");
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    file_name: req.file.filename,
    user_id: req.session.user_id,
    description: req.body.post_url
  })
    .then((dbPostData) => res.redirect("/dashboard"))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  console.log(req.file, req.body.title, req.body.post_url, req.session.user_id);
  // console.log("#2", dbPostData);
});

router.put("/upvote", withAuth, (req, res) => {
  // custom static method created in models/Post.js
  Post.upvote(
    { ...req.body, user_id: req.session.user_id },
    { Vote, Comment, User }
  )
    .then((updatedVoteData) => res.json(updatedVoteData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;