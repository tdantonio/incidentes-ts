import express, { Request, Response } from 'express';

// Crear una instancia de Express
const app = express();
const port = 3000;

// Ruta para "/home"
app.get('/home', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
