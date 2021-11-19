const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment, Vote } = require("../../models");
const withAuth = require("../../utils/auth");
const multer = require("multer");
const path = require("path");
// const { VISITOR_KEYS } = require("@babel/types");
// const { response } = require("express");

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
  },
});

const upload = multer({ storage: storage });
//Multer setup ENDS

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
        attributes: [
          "id",
          "description",
          "comment_text",
          "post_id",
          "user_id",
          "created_at",
        ],
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
        attributes: [
          "id",
          "comment_text",
          "description",
          "post_id",
          "user_id",
          "created_at",
        ],
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
  if (req.body.post_url.length < 5 || !req.file) {
    if (req.body.post_url.length < 5) {
      res.send(
        "your description must be more than 5 characters!, please go back and give a longer description"
      );
    } else {
      res.send(
        "you did noy include a photo, please go back and upload a photo"
      );
    }
  } else {
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      file_name: req.file.filename,
      user_id: req.session.user_id,
      description: req.body.post_url,
    })
      .then((dbPostData) => res.redirect("/dashboard"))
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
  }
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
  console.log("HERE I AM !!!!!!!!!!!!!");
  Post.update(
    {
      title: req.body.title,
      post_url: req.body.description,
      description: req.body.description,
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
  console.log("trying to delete post with id", req.params.id);
  Vote.destroy({
    where: {
      post_id: req.params.id,
    },
  }).then(() => {
    Comment.destroy({
      where: {
        post_id: req.params.id,
      },
    }).then(() => {
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
  });
});
module.exports = router;
