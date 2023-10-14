import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/Security/ProtectedRoute";
/* Style */
import "./App.css";
/* Pages */
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Home from "./pages/public/Home";
import Dashboard from "./pages/authenticated/Dashboard";

function App() {
    const location = useLocation();
    const currentPath = location.pathname.slice(1); // Elimina el "/" inicial
    const { user, isAuthenticated } = useAuth();

    return (
        <div className={`App ${currentPath}`}>
            <Routes>
                {/* Rutas para todos */}
                <Route path="/" element={<Home />} />
                {/* <Route path="/explore" element={<Explore />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} /> */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas para usuarios autenticados */}
                <Route path="/auth" element={<ProtectedRoute isAllowed={isAuthenticated || !!user && user.isEditor} redirectTo="/login"/>}>
                    {/* <Route path="/profile" element={<Profile />} />
                    <Route path="/subscribe" element={<Subscribe />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/logout" element={<Logout />} /> */}
                    <Route path="dashboard" element={<Dashboard />} />

                    {/* Rutas protegidas para usuarios premium */}
                    <Route element={<ProtectedRoute isAllowed={!!user && user.isPremium || !!user && user.isEditor} redirectTo="/register"/>}>
                        {/* <Route path="/premium-content" element={<PremiumContent />} /> */}
                        <Route path="show1" element={<div><h2>soy Premium</h2></div>} />
                    </Route>

                    {/* Rutas protegidas para editores */}
                    <Route path="editor" element={<ProtectedRoute isAllowed={!!user && user.isEditor} redirectTo="/login"/>}>
                        {/* <Route path="/manage-companies" element={<ManageCompanies />} />
                        <Route path="/publish-notifications" element={<PublishNotifications />} />
                        <Route path="/manage-content" element={<ManageContent />} />
                        <Route path="/statistics" element={<Statistics />} /> */}
                        <Route path="show2" element={<div><h2>soy Editor</h2></div>} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
