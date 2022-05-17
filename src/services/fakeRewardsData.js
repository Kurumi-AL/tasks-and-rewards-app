const rewards = [
  {
    id: 1,
    img: "http://dummyimage.com/124x100.png/ff4444/ffffff",
    name: "Bag Clear 10 Lb",
    genre: "Health",
    point: 24,
  },
  {
    id: 2,
    img: "http://dummyimage.com/153x100.png/ff4444/ffffff",
    name: "Syrup - Monin - Blue Curacao",
    genre: "Industrial",
    point: 88,
  },
  {
    id: 3,
    img: "http://dummyimage.com/155x100.png/ff4444/ffffff",
    name: "Banana - Leaves",
    genre: "Jewelry",
    point: 80,
  },
  {
    id: 4,
    img: "http://dummyimage.com/125x100.png/dddddd/000000",
    name: "Muffins - Assorted",
    genre: "Tools",
    point: 63,
  },
  {
    id: 5,
    img: "http://dummyimage.com/222x100.png/cc0000/ffffff",
    name: "Creme De Menth - White",
    genre: "Books",
    point: 97,
  },
  {
    id: 6,
    img: "http://dummyimage.com/179x100.png/dddddd/000000",
    name: "Beer - Paulaner Hefeweisse",
    genre: "Movies",
    point: 79,
  },
  {
    id: 7,
    img: "http://dummyimage.com/173x100.png/5fa2dd/ffffff",
    name: "Cheese - Gorgonzola",
    genre: "Electronics",
    point: 24,
  },
  {
    id: 8,
    img: "http://dummyimage.com/115x100.png/5fa2dd/ffffff",
    name: "Pineapple - Canned, Rings",
    genre: "Home",
    point: 13,
  },
  {
    id: 9,
    img: "http://dummyimage.com/138x100.png/ff4444/ffffff",
    name: "Potatoes - Mini Red",
    genre: "Movies",
    point: 24,
  },
  {
    id: 10,
    img: "http://dummyimage.com/211x100.png/cc0000/ffffff",
    name: "Sea Urchin",
    genre: "Health",
    point: 90,
  },
  {
    id: 11,
    img: "http://dummyimage.com/151x100.png/dddddd/000000",
    name: "Veal - Provimi Inside",
    genre: "Tools",
    point: 50,
  },
  {
    id: 12,
    img: "http://dummyimage.com/220x100.png/ff4444/ffffff",
    name: "Nutmeg - Ground",
    genre: "Beauty",
    point: 85,
  },
  {
    id: 13,
    img: "http://dummyimage.com/136x100.png/dddddd/000000",
    name: "Nestea - Iced Tea",
    genre: "Books",
    point: 12,
  },
  {
    id: 14,
    img: "http://dummyimage.com/195x100.png/5fa2dd/ffffff",
    name: "Pecan Raisin - Tarts",
    genre: "Music",
    point: 93,
  },
  {
    id: 15,
    img: "http://dummyimage.com/139x100.png/5fa2dd/ffffff",
    name: "Tomatoes Tear Drop Yellow",
    genre: "Shoes",
    point: 34,
  },
  {
    id: 16,
    img: "http://dummyimage.com/199x100.png/5fa2dd/ffffff",
    name: "Pork - Chop, Frenched",
    genre: "Baby",
    point: 57,
  },
  {
    id: 17,
    img: "http://dummyimage.com/120x100.png/5fa2dd/ffffff",
    name: "Rum - Light, Captain Morgan",
    genre: "Tools",
    point: 42,
  },
  {
    id: 18,
    img: "http://dummyimage.com/238x100.png/dddddd/000000",
    name: "Beer - Maudite",
    genre: "Toys",
    point: 12,
  },
  {
    id: 19,
    img: "http://dummyimage.com/150x100.png/5fa2dd/ffffff",
    name: "Tilapia - Fillets",
    genre: "Industrial",
    point: 32,
  },
];

export function getRewards() {
  return rewards;
}

export function getReward(id) {
  return rewards.find((t) => t.id === id);
}

export function saveReward(reward) {
  let rewardInDb = rewards.find((t) => t.id === reward.id) || {};
  rewardInDb.name = reward.name;
  rewardInDb.point = reward.point;

  if (!rewardInDb.id) {
    rewardInDb.id = Date.now();
    rewards.push(rewardInDb);
  }

  return rewardInDb;
}

export function deleteReward(id) {
  let rewardInDb = rewards.find((t) => t.id === id);
  rewards.splice(rewards.indexOf(rewardInDb), 1);
  return rewardInDb;
}
