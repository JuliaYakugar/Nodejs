// Для того, чтобы пользователи хранились постоянно, а не только, когда запущен сервер, необходимо реализовать хранение массива в файле.

// В обработчиках получения данных по пользователю нужно читать файл
// В обработчиках создания, обновления и удаления нужно файл читать, чтобы убедиться, что пользователь существует, а затем сохранить в файл, когда внесены изменения
// Не забывайте про JSON.parse() и JSON.stringify() - эти функции помогут вам переводить объект в строку и наоборот.

const fs = require('fs');
const path = require('path');
const express = require('express');
const Joi = require("joi");
const app = express();
let userId = 2;

app.use(express.json());

const schema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    age: Joi.number()
        .integer()
        .min(0)
        .max(120)
        .required(),
    city: Joi.string()
        .min(1)
        .max(30)
});

const pathFile = path.join(__dirname, "users.json");

app.get('/users', (req, res) => {
    res.send(fs.readFileSync(pathFile));
})

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathFile));
    const user = users.find((user) => user.id === Number(req.params.id));
    if (user) {
        res.send({user});
    } else {
        res.status(404);
        res.send({user: null});
    }
})

app.post('/users', (req, res) => {
    userId += 1;
    const users = JSON.parse(fs.readFileSync(pathFile));

    users.push({
        id: userId,
        ...req.body
    });

    fs.writeFileSync(pathFile, JSON.stringify(users, null, 2));

    res.send({
        id: userId,
    })
})

app.put('/users/:id', (req, res) => {
    const result = schema.validate(req.body);

    if(result.error) {
        return res.status(404).send({error: result.error.details})
    }

    const users = JSON.parse(fs.readFileSync(pathFile));
    let user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.city = req.body.city;
        fs.writeFileSync(pathFile, JSON.stringify(users, null, 2));
        res.send({user})
    } else {
        res.status(404);
        res.send({user: hull});
    }
})

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathFile));
    let user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        fs.writeFileSync(pathFile, JSON.stringify(users, null, 2));
        res.send({user})
    } else {
        res.status(404);
        res.send({user: hull});
    }
})

app.listen(3000);