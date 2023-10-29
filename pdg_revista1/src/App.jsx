import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/Security/ProtectedRoute";

/* Style */
import "./App.css";
/* Pages Public */
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Home from "./pages/public/Home";
import Contact from "./pages/public/Contact";
/* Pages Editor */
import Dashboard from "./pages/editor/Dashboard";

/* Pages Premium */
import LogisticsEntities from "./pages/authenticated/LogisticsEntities";

import Sidebar from "./components/Sidebar/Sidebar";

import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
function App() {
    const location = useLocation();
    const pathParts = location.pathname.slice(1).split('/');

    // Encuentra el índice del último segmento de la ruta que pertenece a App.jsx
    const appEndIndex = pathParts.length - 2;  // Asume que el último segmento pertenece a otro archivo

    // Divide la ruta en partes que pertenecen a App.jsx y partes que no
    const appPathParts = pathParts.slice(0, appEndIndex + 1);
    const otherPathParts = pathParts.slice(appEndIndex + 1);

    // Formatea y concatena las partes de la ruta
    const appPath = appPathParts.join('_');
    const otherPath = otherPathParts.join('_');  // En caso de que hay más de un segmento en otherPathParts
    const currentPath = `${appPath} ${otherPath}`;
    
    const { user, isAuthenticated } = useAuth();

    /* useEffect(() => {
        verifyToken();
    }, [verifyToken]); */
    return (
        <div className={`App ${currentPath}`}>
            <Routes>
                {/* Rutas para todos */}
                <Route path="/" element={<Home />} />
                {/* <Route path="/explore" element={<Explore />} />
                <Route path="/about" element={<About />} />*/}
                <Route path="/contact" element={<Contact />} /> 
                <Route path="/register" element={<Register isPage={true}/>} />
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas para usuarios autenticados */}
                <Route
                    path="/auth"
                    /* element={
                        <ProtectedRoute
                            isAllowed={
                                isAuthenticated || (!!user && user.isEditor)
                            }
                            redirectTo="/login"
                        />
                    } */
                >
                    {/* <Route path="/profile" element={<Profile />} />
                    <Route path="/subscribe" element={<Subscribe />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/logout" element={<Logout />} /> */}

                    {/* <Route path="dashboard" element={<Dashboard />} /> */}
                    <Route path="logistics-entities" element={<LogisticsEntities />} />

                    {/* Rutas protegidas para usuarios premium */}
                    <Route
                        /* element={
                            <ProtectedRoute
                                isAllowed={
                                    (!!user && user.isPremium) ||
                                    (!!user && user.isEditor)
                                }
                                redirectTo="/register"
                            />
                        } */
                    >
                        {/* <Route path="/premium-content" element={<PremiumContent />} /> */}
                        <Route
                            path="show1"
                            element={
                                <div>
                                    <h2>soy Premium</h2>
                                </div>
                            }
                        />
                    </Route>

                    {/* Rutas protegidas para editores */}
                    <Route
                        path="editor"
                        /* element={
                            <ProtectedRoute
                                isAllowed={!!user && user.isEditor}
                                redirectTo="/login"
                            />
                        } */
                    >
                        {/* < Sidebar /> */}
                        <Route path="dashboard/*" element={<Dashboard />} />
                        {/* <Route path="/manage-companies" element={<ManageCompanies />} />
                        <Route path="/publish-notifications" element={<PublishNotifications />} />
                        <Route path="/manage-content" element={<ManageContent />} />
                        <Route path="/statistics" element={<Statistics />} /> */}
                        <Route
                            path=""
                            element={
                                <div> 
                                    <h2>soy Editor</h2>
                                </div>
                            }
                        />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
