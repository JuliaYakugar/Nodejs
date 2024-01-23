// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

const http = require('http');
let countHome = 0;
let countAbout = 0;
let count404 = 0;

const server = http.createServer((req, res) => {
    console.log('Запрос получен');

    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`<h1>Главная страница</h1><a href="/about">Обо мне</a><p>Просмотров: ${++countHome}</p>`);
    } else if (req.url === '/about') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`<h1>Страница обо мне</h1><a href="/">Главная</a><p>Просмотров: ${++countAbout}</p>`);
    } else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`<h1>404</h1><p>Просмотров: ${++count404}</p>`);
    }
})

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})