const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../../models');
const sequelize = require('../../config/connection');


// get all users
router.get('/', (req,res) => {
    console.log('===========');
    Post.findAll({
        order: [['created_at', 'DESC']],
       attributes: ['id', 'post_url', 'title', 'created_at',  
       [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
})
.then(dbPostData => res.json(dbPostData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
})
});

//get a single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
             model: User,
             attributes: ['username']   
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this is id '})
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

router.post('/', (req, res) =>{
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.body.user_id
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
})

//PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
if (req.session) {
    Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
.then(updatedVoteData => res.json(updatedVoteData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
})
}
});

router.put('/:id', (req, res) =>{
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id'})
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.delete('/:id', (req, res) => {
    Post.destroy({ 
        where: {
        id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message : 'No post found with this is id' })
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

module.exports = router;