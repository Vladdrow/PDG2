import { Router } from "express";
import pool from "../db.js";

import { showHomePage } from "../controllers/reader.controllers.js";

/* const poolInstance = */


const router = Router();

// Define las rutas para New Users
router.get("/", (req, res) => {

});

router.get("/explore", (req, res) => {
    // Acción para mostrar la página de exploración para nuevos usuarios
});

router.get("/about", (req, res) => {
    // Acción para mostrar la página "Nosotros" para nuevos usuarios
});

router.get("/contact", (req, res) => {
    // Acción para mostrar la página de contacto para nuevos usuarios
});

/* router.get("/register", (req, res) => {
    // Acción para mostrar la página de registro para nuevos usuarios
}); */

/* router.get("/login", (req, res) => {
    // Acción para mostrar la página de inicio de sesión para nuevos usuarios
}); */

// Define las rutas para Usuarios Registrados
router.get("/profile", (req, res) => {
    // Acción para mostrar la página de perfil para usuarios registrados
});

router.get("/subscribe", (req, res) => {
    // Acción para mostrar la página de suscripción para usuarios registrados
});

router.get("/notifications", (req, res) => {
    // Acción para mostrar la página de notificaciones para usuarios registrados
});

// Define las rutas para Usuarios Premium
router.get("/dashboard", (req, res) => {
    // Acción para mostrar la página de dashboard para usuarios premium
});

router.get("/premium-content", (req, res) => {
    // Acción para mostrar la página de contenido premium para usuarios premium
});

// Otras rutas comunes

export default router;
