import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Define las rutas para Editores
router.get("/editor", (req, res) => {
    // Acción para mostrar la página de inicio para editores
});

router.get("/manage-companies", (req, res) => {
    // Acción para mostrar la página de gestión de empresas para editores
});

router.get("/publish-notifications", (req, res) => {
    // Acción para mostrar la página de publicación de notificaciones para editores
});

router.get("/manage-content", (req, res) => {
    // Acción para mostrar la página de gestión de contenido para editores
});

router.get("/statistics", (req, res) => {
    // Acción para mostrar la página de estadísticas para editores
});

export default router;
