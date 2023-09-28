const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());

//we dont use this todos array bcz we want to store data in file so after restarting our data is saved
// let todos = [];

function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id) return i;
  }
  return -1;
}

function removeIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

app.get("/todos", (req, res) => {
  //   res.json(todos);
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post("/todos/:id", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 100000),
    title: req.body.title,
    description: req.body.description,
  };
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    todos.push(newTodo);
  });
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id)); //req.params.id => when we write route and return id in it then params take this from above
  //so we dont need to write in body or query
  if (todoIndex == -1) {
    res.status(404).send();
  } else {
    todos = removeIndex(todos, todoIndex);
    res.status(200).send();
  }
});

app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(3003, () => {
  console.log(`app is listening on port 3003`);
});
