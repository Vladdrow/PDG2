/* process.env.TZ = "America/La_Paz"; */
import express from "express";
import app from "./app.js";
import config from "./config.js";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

/* import routerReader from "./routes/reader.routes.js";
import routerEditor from "./routes/editor.routes.js"; */
import routerAuth from "./routes/auth.routes.js";
import routerContent from "./routes/content.routes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = config.port;

app.use(cookieParser());
app.use(
    express.json()
); /* Procesar los datos del cliente, si es json lo recibe */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "assets")));

/* const corsOptions = {
    origin: "http://192.168.58.228:5173", // Reemplaza con la URL de tu frontend
    credentials: true, // Permite el envío de cookies
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
 */
app.use(routerAuth);
app.use(routerContent);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
