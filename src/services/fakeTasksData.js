const tasks = [
  {
    id: 1,
    name: "١٢٣",
    point: 67,
  },
  {
    id: 2,
    name: "﻿",
    point: 43,
  },
  {
    id: 3,
    name: "社會科學院語學研究所",
    point: 100,
  },
  {
    id: 4,
    name: "<svg><script>0<1>alert('XSS')</script>",
    point: 79,
  },
  {
    id: 5,
    name: "❤️ 💔 💌 💕 💞 💓 💗 💖 💘 💝 💟 💜 💛 💚 💙",
    point: 70,
  },
  {
    id: 6,
    name: "spring 2022",
    point: 2,
  },
  {
    id: 7,
    name: "-1.00",
    point: 62,
  },
  {
    id: 8,
    name: "test",
    point: 16,
  },
  {
    id: 9,
    name: "nil",
    point: 10,
  },
  {
    id: 10,
    name: "-1/2",
    point: 31,
  },
  {
    id: 11,
    name: "NIL",
    point: 54,
  },
  {
    id: 12,
    name: "999999999999999999999999999999999999999999999999999999",
    point: 89,
  },
  {
    id: 13,
    name: "ÅÍÎÏ˝ÓÔÒÚÆ☃",
    point: 81,
  },
  {
    id: 14,
    name: "ヽ༼ຈل͜ຈ༽ﾉ ヽ༼ຈل͜ຈ༽ﾉ ",
    point: 54,
  },
  {
    id: 15,
    name: "-1/2",
    point: 94,
  },
  {
    id: 16,
    name: "null",
    point: 5,
  },
  {
    id: 17,
    name: "<img src=x onerror=alert('hi') />",
    point: 61,
  },
  {
    id: 18,
    name: "$1.00",
    point: 13,
  },
  {
    id: 19,
    name: "울란바토르",
    point: 65,
  },
];

export function getTasks() {
  return tasks;
}

export function getTask(id) {
  return tasks.find((t) => t.id === id);
}

export function saveTask(task) {
  let taskInDb = tasks.find((t) => t.id === task.id) || {};
  taskInDb.name = task.name;
  taskInDb.point = task.point;

  if (!taskInDb.id) {
    taskInDb.id = Date.now();
    tasks.push(taskInDb);
  }

  return taskInDb;
}

export function deleteTask(id) {
  let taskInDb = tasks.find((t) => t.id === id);
  tasks.splice(tasks.indexOf(taskInDb), 1);
  return taskInDb;
}
