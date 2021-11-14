const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'I have an electric guitar I am willing to trade. Let me know.',
    user_id: 6,
    post_id: 1
  },
  {
    comment_text: 'I have a 2 wheel drive quad Id be willing to part with',
    user_id: 6,
    post_id: 8
  },
  {
    comment_text: 'I have a couple horses, I could show you some basic things.',
    user_id: 3,
    post_id: 10
  },
  {
    comment_text: 'I have a salt water tank Id be willing to part with.',
    user_id: 3,
    post_id: 18
  },
  {
    comment_text: 'Still Available',
    user_id: 7,
    post_id: 5
  },
  {
    comment_text: 'My kids would love this! FIRST PLEASE!!',
    user_id: 1,
    post_id: 20
  },
  {
    comment_text: 'I will take as many tomatoes as I can, making homemade pasta sauce, this will be perfect!',
    user_id: 6,
    post_id: 7
  },
  {
    comment_text: 'I would love some lessons, I can help with yard work.',
    user_id: 7,
    post_id: 4
  },
  {
    comment_text: 'Do you have a webpage where I can see your work? I am interested in matching bracelets for my aunts for Christmas.',
    user_id: 6,
    post_id: 12
  },
  {
    comment_text: 'Second please! I can pick up.',
    user_id: 6,
    post_id: 20
  },
  {
    comment_text: 'Ready to get rid of this thing FAST',
    user_id: 3,
    post_id: 14
  },
  {
    comment_text: 'Would you be interested in offering catering?',
    user_id: 5,
    post_id: 4
  },
  {
    comment_text: 'I also have a collection I am looking to add to, can I come take a look at what you have?',
    user_id: 4,
    post_id: 9
  },
  {
    comment_text: 'I am interested, could we meet at a jeweler so I can get an appraisal?',
    user_id: 5,
    post_id: 14
  },
  {
    comment_text: 'I have ALWAYS wanted to learn. Do you have a board or do I need to buy or rent one? What else would I need?',
    user_id: 6,
    post_id: 2
  },
  {
    comment_text: 'I have a beginners surf board you can use, however you may need to rent a wetsuit, the water is cold!',
    user_id: 8,
    post_id: 2
  },
  {
    comment_text: 'Next please! If the others fall through',
    user_id: 2,
    post_id: 20
  },
  {
    comment_text: 'Can you please send some pics of the interior to my email cstoneman2@last.fm Thanx' ,
    user_id: 4,
    post_id: 11
  },
  {
    comment_text: 'What sort of limitations do you have? I would like my property surveyed.',
    user_id: 5,
    post_id: 13
  },
  {
    comment_text: 'I would like this lot',
    user_id: 9,
    post_id: 16
  },
  {
    comment_text: 'I would love to learn how to make some spanish cuisine, can you help?',
    user_id: 6,
    post_id: 4
  },
  {
    comment_text: 'I have some donkeys you can ride LOL',
    user_id: 4,
    post_id: 10
  },
  {
    comment_text: 'I have a 4x4 quad, needs some work though',
    user_id: 3,
    post_id: 8
  },
  {
    comment_text: 'I know of an equestrian center, I will see if they are interested in barters',
    user_id: 8,
    post_id: 10
  },
  {
    comment_text: 'Which venu is this at?',
    user_id: 1,
    post_id: 15
  },
  {
    comment_text: 'I would love to take you up on your offer please',
    user_id: 5,
    post_id: 3
  },
  {
    comment_text: 'Are you interested in trading for all 4 tickets?',
    user_id: 1,
    post_id: 15
  },
  {
    comment_text: 'Second please, my sister is due any time and needs clothing badly',
    user_id: 4,
    post_id: 16
  },
  {
    comment_text: 'Im really interested in a salt water tank, can you email me?',
    user_id: 4,
    post_id: 18
  },
  {
    comment_text: 'Im joking!',
    user_id: 4,
    post_id: 10
  },
  {
    comment_text: 'Open to trades???',
    user_id: 7,
    post_id: 5
  },
  {
    comment_text: 'No, only looking for acoustic, thank you though',
    user_id: 10,
    post_id: 1
  },
  {
    comment_text: 'I have a whole garage of things that need fixing, I also have some items for barter.',
    user_id: 3,
    post_id: 19
  },
  {
    comment_text: 'Next please, I have been looking for this size.',
    user_id: 5,
    post_id: 3
  },
  {
    comment_text: 'Do you have any paperwork on the ring? Appraisals, etc?',
    user_id: 10,
    post_id: 14
  },
  {
    comment_text: 'Are you willing to trade snything else?',
    user_id: 10,
    post_id: 8
  },
  {
    comment_text: 'I have a GMC Yukon I may trade you for. When are you available?',
    user_id: 10,
    post_id: 11
  },
  {
    comment_text: 'I need some tires for my 4runner, will they fit?',
    user_id: 8,
    post_id: 5
  },
  {
    comment_text: 'I need my law edger fixed ASAP for my business, I can trade yardwork',
    user_id: 8,
    post_id: 19
  },
  {
    comment_text: 'I have a couple broken weedeaters that I need fixed up so I can sell.',
    user_id: 9,
    post_id: 19
  },
  {
    comment_text: 'If not, could you make a recommendation for a caterer?',
    user_id: 5,
    post_id: 4
  },
  {
    comment_text: 'I am looking for a 4x4, but only have a sedan for trade. Any interest? Great commuter car, excellent on gas. ',
    user_id: 2,
    post_id: 11
  },
  {
    comment_text: 'Preferably at my house',
    user_id: 4,
    post_id: 6
  },
  {
    comment_text: 'I am willing to baysit at my home, I watch other kids so it cannot be at your house',
    user_id: 9,
    post_id: 6
  },
  {
    comment_text: 'Do you have any Elvis records?',
    user_id: 7,
    post_id: 9
  },
  {
    comment_text: 'Can you fix home appliances?',
    user_id: 4,
    post_id: 19
  },
  {
    comment_text: 'Well, let me think about it, I will let you know this week',
    user_id: 10,
    post_id: 1
  },
  {
    comment_text: 'I run a shop in town, are you looking for work? I need someone ASAP',
    user_id: 2,
    post_id: 19
  },
  {
    comment_text: 'Sounds good, lets meet up so I can see this guitar',
    user_id: 10,
    post_id: 1
  },
  {
    comment_text: 'I am also interested, I would love to have a matching set made for my mother',
    user_id: 10,
    post_id: 12
  }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
