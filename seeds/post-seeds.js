const { Post } = require('../models');

const postdata = [
  {
    title: 'WANTED: Guitar',
    description: 'Acoustic guitar in working condition wanted. Have womens clothing, mens golf set or soccer net available for trade.',
    user_id: 10
  },
  {
    title: 'AVAILABLE: Surf Lessons',
    description: 'I an offering surf lessons, I am an experienced instructor with competition experience and can safely train children and adults. Open to offers!',
    user_id: 8
  },
  {
    title: 'FREE: Rollerblades',
    description: 'I have mens size 10.5 rollerblades for free. They are well used, but have plenty of life yet. Son outgrew them.',
    
    user_id: 1
  },
  {
    title: 'Cooking lessons offered',
    description: 'Gourmet cook and chef ready to help you learn! I really need someone to change the oil in my car for trade. Thank you!',
    
    user_id: 4
  },
  {
    title: 'AVAILABLE: Tires',
    description: 'I have tires taken off my stock tacoma, 60% tread, open to trades',
    
    user_id: 7
  },
  {
    title: 'WANTED: Babysitter',
    description: 'Desparetly needing a babysitter for my 5 year old daughter all day on Sunday and after school Monday thru Wednesdays, I am able to cook for you, clean your home or walk your dog. Please message me.',
    
    user_id: 4
  },
  {
    title: 'FREE: TOMATOESSS!!!',
    description: 'My garden is overflowing, I have tomatoes out my ears, please come take some off my hands!',
    
    user_id: 1
  },
  {
    title: 'WANT TO TRADE: Wanting to trade my dirt bike for quad',
    description: 'Ive got a 2003 Honda CR 85R dirt bike that Id like to trade for a 4x4 quad. Bike runs great, just have no where to ride it and would like to try a quad for hunting ',
    
    user_id: 1
  },
  {
    title: 'Record Collection: Open to trades',
    description: 'I have 300 records ranging from country, to rock, to oldies and more. I am open to trades for interested parties',
    
    user_id: 9
  },
  {
    title: 'Horse-rising Lessons WANTED',
    description: 'I want to learn to ride horses! Please teach me, I have many household items I can trade such as a King size bed frame, Lawnmower, Desk and chair, and more. Lets make a deal!',
    
    user_id: 5
  },
  {
    title: 'TRADING my 1998 Ford F250 for ???',
    description: 'I have a 1998 Ford F250 with 255,000 miles on it, works well, paint faded, will trade for guns, motorcycles, boats, etc. Whatcha got?',
    
    user_id: 3
  },
  {
    title: 'AVAILABLE: Homemade jewelry',
    description: 'I handmake earrings, necklaces, bracelets, anklets and more. I would be happy to trade, let me know what you want and what you have.',
    
    user_id: 10
  },
  {
    title: 'Drone services',
    description: 'I am a skilled drone operator, I can help you with your projects from real estate to surveillance. I am open to goods or services',
    
    user_id: 8
  },
  {
    title: 'AVAILABLE: Engagement ring',
    description: 'I have a beautiful engagnement ring, white gold 1.5 karat diamond. Must see to appreciate. NO longer want or need. Fianccee is a cheater!!! Make me an offer! ',
    
  },
  {
    title: 'Tickets to concert AVAILABLE',
    description: 'Bought 4 tickets to the Blake Shelton concert, 2 invites cannot go, so 2 tickets, front row are avilable. I am really looking for services such as automotive, landscaping, or ???',
    
    user_id: 3
  },
  {
    title:'AVAILABLE: Lot of Infant girl clothing',
    description: 'I have girls 0-3 month clothing, an entire lot of jammies, outfits, onesies, etc. I am looking for childrens clothing and womens shoes size 8.',
    
    user_id: 7
  },
  {
    title: 'FREE: Notebooks',
    description: 'I bought too may notebooks for school. I have 5 available for free. Just want gone',
    
    user_id: 6
  },
  {
    title: 'WANTED: Fish tank',
    description: 'Wanting a 10 gallon+ size fish tank, I have a decent coin collection to trade or some firewood',
    
    user_id: 4
  },
  {
    title: 'OFFER: Small engine repair',
    description: 'Open to trades of all kind, I can do small engine repairs on weedeaters, lawnmowers, motorcycles, quads, etc.',
    
    user_id: 6
  },
  {
    title: 'FREE: trampoline',
    description: 'Trampoline is 3 years old, still in good condition with net. We are moving and cannot take. First come, first serve!',
    
    user_id: 7
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
