const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const pathFile = path.join(__dirname, "count.json");

if (!fs.existsSync(pathFile)) {
    fs.writeFileSync(pathFile, JSON.stringify({'/': 0, '/about': 0,}, null, 2)); 
}

const count = JSON.parse(fs.readFileSync(pathFile));

app.get('/', (reg, res) => {
    res.send(`<h1>Главная страница</h1><a href="/about">Обо мне</a><p>Просмотров: ${++count['/']}</p>`);
    fs.writeFileSync(pathFile, JSON.stringify(count, null, 2));
})

app.get('/about', (reg, res) => {
    res.send(`<h1>Страница обо мне</h1><a href="/">Главная</a><p>Просмотров: ${++count['/about']}</p>`);
    fs.writeFileSync(pathFile, JSON.stringify(count, null, 2));
})

app.listen(3000);
