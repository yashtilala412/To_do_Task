const express = require("express");
const router = express.Router();
const fs = require("fs");
const filePath = "./data.json";
router.use(express.json());

// end point to list all todos
router.get("/", (req, res) => {
    const data = readData(filePath);
    res.json(data);
});

// end point to add todo
router.post("/", (req, res) => {
    let { id, title, isCompleted } = req.body;
    let data = readData(filePath);
    let newData = [...data, { id, title, isCompleted }];
    saveData(newData, filePath);
    // res.send("Process done");
    res.send(newData);
});

//end point to fetch data of specific todo
router.get("/:id", (req, res) => {
    let id = req.params.id;
    let data = readData(filePath);
    let todo = data.filter((e) => e.id == id);
    res.json(todo);
    // res.json(todo ? [todo] : []);
});

// end point to update todo
router.put("/:id", (req, res) => {
    let id = req.params.id;
    let { title, isCompleted } = req.body;
    let data = readData(filePath);
    let newData = data.map((e) => (e.id != id ? e : { id, title, isCompleted }));
    saveData(newData, filePath);
    // res.send("Operation done");
    res.send(newData);
});

// end point to delete todo
router.delete("/:id", (req, res) => {
    let id = req.params.id;
    let data = readData(filePath);
    let newData = data.filter((e) => e.id != id);
    saveData(newData, filePath);
    // res.send("Operation done");
    res.send(newData);
});

// end point to search todo by title
router.get("/search/:para", (req, res) => {
    let para = req.params.para;
    let data = readData();
    let todo = data.filter((e) =>
        e.title.toUpperCase().startsWith(para.toUpperCase())
    );
    res.json(todo);
});

function readData(filename) {
    const data = fs.readFileSync(filename);
    return data ? JSON.parse(data.toString()) : [];
}

function saveData(data, filename) {
    fs.writeFile(filename, JSON.stringify(data), (err) => {
        if (err) console.log(err);
        else console.log("Done");
    });
}

module.exports = router;