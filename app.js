"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Crear una instancia de Express
const app = (0, express_1.default)();
const port = 3000;
// Ruta para "/home"
app.get('/home', (req, res) => {
    res.send('Hello, World!');
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
