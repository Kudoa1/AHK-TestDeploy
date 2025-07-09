# Guía para desplegar un backend Node.js + TypeScript + Express en Render (plan gratuito)

## 1. Estructura del proyecto esperada
/mi-backend/
├── package.json
├── tsconfig.json
├── .gitignore
├── /src
│ └── index.ts
------------------------------
## 2. Scripts en `package.json`
------------------------------
"scripts": {
  "dev": "ts-node-dev --respawn src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
------------------------------
## 3. tsconfig.json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
------------------------------
4. .gitignore
node_modules
dist
.env
------------------------------
5. Código mínimo en src/index.ts
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", true);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Método: ${req.method} - URL: ${req.url}`);
  next();
});

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
------------------------------
6. Pasos para desplegar en Render
Subí tu proyecto a un repositorio de GitHub.

Entrá a https://render.com.
Hacé clic en New > Web Service.
Conectá tu cuenta de GitHub y seleccioná el repositorio.

Completá los campos:
Name: el nombre que desees
Region: la más cercana (ej. Oregon o Virginia)
Branch: main (u otra)
Build Command: npm install && npm run build
Start Command: npm start
Root Directory: dejalo vacío

Agregá las variables de entorno necesarias (ej: MONGO_URI, OPENAI_KEY, etc).
Hacé clic en Create Web Service.
------------------------------
7. Finalización
Render va a compilar y lanzar tu backend automáticamente.
Te dará una URL pública como: https://tu-app.onrender.com.
Cada push a la rama elegida genera un nuevo deploy automáticamente.
El servicio se duerme tras 15 min de inactividad, pero se despierta solo con la próxima petición.

