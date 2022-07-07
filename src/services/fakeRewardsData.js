import * as genresAPI from "./fakeGenreService";

const rewards = [
  {
    id: 1,
    name: "Cucumber - Pickling Ontario",
    point: 58,
    genre: { id: "5b21ca3eeb7f6fbccd471818", name: "Beauty" },
    comment: "'\"'",
    isModalOpen: false,
  },
  {
    id: 2,
    name: "Beef - Flank Steak",
    point: 45,
    genre: { id: "5b21ca3eeb7f6fbccd471818", name: "Beauty" },
    comment: "/dev/null; touch /tmp/blns.fail ; echo",
    isModalOpen: false,
  },
  {
    id: 3,
    name: "Bread - Corn Muffaletta",
    point: 49,
    genre: { id: "5b21ca3eeb7f6fbccd471818", name: "Beauty" },
    comment: "`⁄€‹›ﬁﬂ‡°·‚—±",
    isModalOpen: false,
  },
  {
    id: 4,
    name: "Crush - Grape, 355 Ml",
    point: 15,
    genre: { id: "5b21ca3eeb7f6fbccd471818", name: "Beauty" },
    comment: "1/2",
    isModalOpen: false,
  },
  {
    id: 5,
    name: "Bread Base - Gold Formel",
    point: 88,
    genre: { id: "5b21ca3eeb7f6fbccd471818", name: "Beauty" },
    comment: '""',
    isModalOpen: false,
  },
  {
    id: 6,
    name: "Nut - Chestnuts, Whole",
    point: 21,
    genre: { id: "5b21ca3eeb7f6fbccd471818", name: "Beauty" },
    comment: "・(￣∀￣)・:*:",
    isModalOpen: false,
  },
  {
    id: 7,
    name: "Cake - Pancake",
    point: 24,
    genre: { id: "5b21ca3eeb7f6fbccd471814", name: "Food" },
    comment: '"',
    isModalOpen: false,
  },
  {
    id: 8,
    name: "Sherry - Dry",
    point: 17,
    genre: { id: "5b21ca3eeb7f6fbccd471814", name: "Food" },
    comment: "␡",
    isModalOpen: false,
  },
  {
    id: 9,
    name: "Juice - Cranberry, 341 Ml",
    point: 29,
    genre: { id: "5b21ca3eeb7f6fbccd471814", name: "Food" },
    comment: "😍",
    isModalOpen: false,
  },
  {
    id: 10,
    name: "Wine - Sake",
    point: 75,
    genre: { id: "5b21ca3eeb7f6fbccd471814", name: "Food" },
    comment: "1",
    isModalOpen: false,
  },
  {
    id: 11,
    name: "Vaccum Bag - 14x20",
    point: 25,
    genre: { id: "5b21ca3eeb7f6fbccd471814", name: "Food" },
    comment: "() { 0; }; touch /tmp/blns.shellshock1.fail;",
    isModalOpen: false,
  },
  {
    id: 12,
    name: "Wine - Chablis J Moreau Et Fils",
    point: 70,
    genre: { id: "5b21ca3eeb7f6fbccd471814", name: "Food" },
    comment: "Ṱ̺̺̕o͞ ̷i̲̬͇̪͙n̝̗͕v̟̜̘̦͟o̶̙̰̠kè͚̮̺̪̹̱̤ ̖t̝͕̳̣̻̪͞h̼͓̲̦̳̘̲e͇̣̰̦̬͎ ̢̼̻̱̘h͚͎͙̜̣̲ͅi̦̲̣̰̤v̻͍e̺̭̳̪̰-m̢iͅn̖̺̞̲̯̰d̵̼̟͙̩̼̘̳ ̞̥̱̳̭r̛̗̘e͙p͠r̼̞̻̭̗e̺̠̣͟s̘͇̳͍̝͉e͉̥̯̞̲͚̬͜ǹ̬͎͎̟̖͇̤t͍̬̤͓̼̭͘ͅi̪̱n͠g̴͉ ͏͉ͅc̬̟h͡a̫̻̯͘o̫̟̖͍̙̝͉s̗̦̲.̨̹͈̣",
    isModalOpen: false,
  },
  {
    id: 13,
    name: "Apple Cider",
    point: 38,
    genre: { id: "5b21ca3eeb7f6fbccd471814", name: "Food" },
    comment: "nil",
    isModalOpen: false,
  },
  {
    id: 14,
    name: "Applesauce",
    point: 71,
    genre: { id: "5b21ca3eeb7f6fbccd471814", name: "Food" },
    comment: "-1",
    isModalOpen: false,
  },
  {
    id: 15,
    name: "Pear - Asian",
    point: 23,
    genre: { id: "5b21ca3eeb7f6fbccd471820", name: "Date" },
    comment: "../../../../../../../../../../../etc/passwd%00",
    isModalOpen: false,
  },
  {
    id: 16,
    name: "Pasta - Shells, Medium, Dry",
    point: 76,
    genre: { id: "5b21ca3eeb7f6fbccd471820", name: "Date" },
    comment: " ",
    isModalOpen: false,
  },
  {
    id: 17,
    name: "Cheese - Parmesan Grated",
    point: 30,
    genre: { id: "5b21ca3eeb7f6fbccd471820", name: "Date" },
    comment: "<script>alert('hi')</script>",
    isModalOpen: false,
  },
  {
    id: 18,
    name: "Mushroom - White Button",
    point: 9,
    genre: { id: "5b21ca3eeb7f6fbccd471820", name: "Date" },
    comment: "(╯°□°）╯︵ ┻━┻)  ",
    isModalOpen: false,
  },
  {
    id: 19,
    name: "French Kiss Vanilla",
    point: 25,
    genre: { id: "5b21ca3eeb7f6fbccd471820", name: "Date" },
    comment: "<script>alert('hi')</script>",
    isModalOpen: false,
  },
  {
    id: 20,
    name: "Squash - Pepper",
    point: 52,
    genre: { id: "5b21ca3eeb7f6fbccd471820", name: "Date" },
    comment: "̗̺͖̹̯͓Ṯ̤͍̥͇͈h̲́e͏͓̼̗̙̼̣͔ ͇̜̱̠͓͍ͅN͕͠e̗̱z̘̝̜̺͙p̤̺̹͍̯͚e̠̻̠͜r̨̤͍̺̖͔̖̖d̠̟̭̬̝͟i̦͖̩͓͔̤a̠̗̬͉̙n͚͜ ̻̞̰͚ͅh̵͉i̳̞v̢͇ḙ͎͟-҉̭̩̼͔m̤̭̫i͕͇̝̦n̗͙ḍ̟ ̯̲͕͞ǫ̟̯̰̲͙̻̝f ̪̰̰̗̖̭̘͘c̦͍̲̞͍̩̙ḥ͚a̮͎̟̙͜ơ̩̹͎s̤.̝̝ ҉Z̡̖̜͖̰̣͉̜a͖̰͙̬͡l̲̫̳͍̩g̡̟̼̱͚̞̬ͅo̗͜.̟",
    isModalOpen: false,
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
  rewardInDb.genre = genresAPI.genres.find((g) => g.id === reward.genreId);
  rewardInDb.comment = reward.comment;
  rewardInDb.isModalOpen = false;

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
