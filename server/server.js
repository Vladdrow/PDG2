/* process.env.TZ = "America/La_Paz"; */
import express from "express";
import app from "./app.js";
import config from "./config.js";
import cookieParser from 'cookie-parser';


import routerReader from "./routes/reader.routes.js";
import routerEditor from "./routes/editor.routes.js";
import routerAuth from "./routes/auth.routes.js";
import dotenv from 'dotenv';
dotenv.config();

const port = config.port;

app.use(
    express.json()
); /* Procesar los datos del cliente, si es json lo recibe */

app.use(routerAuth);
app.use(routerReader);
app.use(routerEditor);
app.use(cookieParser());

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
