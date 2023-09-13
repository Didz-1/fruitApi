require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const fruits = require("./fruits.json");


const getFruitIndex = name => {
    //take lowercase fruitname and return index of the fruit or -1 if false
    return fruits.findIndex((fruit) => fruit.name.toLowerCase() == name);
}

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello Fruit API!");
});

app.get("/fruits", (req, res) => {
    res.send(fruits);
});

app.delete('/fruits/:name', (req, res) => {
    const fi = getFruitIndex(req.params.name.toLowerCase());
    if (fi == -1) {
        //fruit not found
        res.status(404).send("Fruit not found");
    } else {
        fruits.splice(fi, 1);
        res.sendStatus(200);

    }
  })

app.get("/fruits/:name", (req, res) => {
    // res.send(`Return a fruit with ${req.params.name} name`);
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name);
    if (fruit == undefined) {
        res.status(404).send("The fruit does not exist");
    } else {
        res.send(fruit);
    }

});


app.post("/fruits", (req, res) => {
    //check if fruit exists
    
    const fi = getFruitIndex(req.body.name.toLowerCase());
    if (fi > -1) {
        res.status(409).send("The fruit already exists.");
    } else {
        // create array of all id's
        const ids = fruits.map((fruit) => fruit.id);
        //get the maximum id
        let maxId = Math.max(...ids);
        //increment by 1
        maxId++;
        //adjust id to new maxID
        req.body.id = maxId;

        fruits.push(req.body);
        res.status(201).send(req.body);
    }
});




// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });


// app.get("/chicken", (req, res) => {
//     res.send("Hello Chicken!");
// });

// app.get("/chicken/:name", (req, res) => { //http://localhost:3000/chicken/alice?apikey=1234
//     res.send(req.query);
// });

// app.get("/example", (req, res) => {
//     res.sendStatus(418);
    
// });

app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
});