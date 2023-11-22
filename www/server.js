const express = require('express');

const app = express();
const path = require('path');
const fs = require("fs");
const filePath = "users.json";

//if main catalog is dist!
app.use(express.static(__dirname));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'src/views'));

app.get('/', (req, res) => {
    console.log(req);
    const fileUsers = fs.readFileSync(filePath,"utf8");
    const users = JSON.parse(fileUsers);
    res.render('index', {users: users});
});


app.listen(3000, () => {
    console.log('Express is listening on port 3000!')
})