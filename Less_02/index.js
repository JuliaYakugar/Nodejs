function add (x, y) {
    return x + y;
}

function sub (x, y) {
    return x - y;
}

function mul (x, y) {
    return x * y;
}

function div (x, y) {
    return y == 0 ? 'Ошибка деления' : x / y;
}

module.exports = { add, sub, mul, div };