import express from "express";
import { connectDB } from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", true);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Método: ${req.method} - URL: ${req.url}`);
  next();
});

// Conexión y arranque del servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
});

// Rutas
app.get("/", (req, res) => {
  res.send("¡Hola desde la API con TypeScript y Express!");
});

app.post("/saludar", (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "Falta el campo 'nombre'" });
  }
  res.json({ mensaje: `Hola, ${nombre}!` });
});