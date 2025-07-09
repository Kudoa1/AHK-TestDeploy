import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas básicas
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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
