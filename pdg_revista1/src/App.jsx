import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/Security/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
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
                {/* <Route path="/explore" element={<Explore />} /> */}
                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/contact" element={<Contact />} /> */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas para usuarios autenticados */}
                <Route element={<ProtectedRoute isAllowed={isAuthenticated} redirectTo="/login"/>}>
                    {/* <Route path="/profile" element={<Profile />} /> */}
                    {/* <Route path="/subscribe" element={<Subscribe />} /> */}
                    {/* <Route path="/notifications" element={<Notifications />} /> */}
                    {/* <Route path="/logout" element={<Logout />} /> */}
                    <Route path="/dashboard" element={<Dashboard />} />  {/* Accesible para usuarios premium y editores */}

                    {/* Rutas protegidas para usuarios premium */}
                    <Route element={<ProtectedRoute isAllowed={!!user && user.isPremium} redirectTo="/subscribe"/>}>
                        {/* <Route path="/premium-content" element={<PremiumContent />}  />*/} {/* Para rellenar, no se que colocar */}
                    </Route>

                    {/* Rutas protegidas para editores */}
                    <Route element={<ProtectedRoute isAllowed={!!user && user.isEditor} redirectTo="/login"/>}>
                        {/* <Route path="/editor" element={<Editor />} /> */}
                        {/* <Route path="/manage-companies" element={<ManageCompanies />} /> */}
                        {/* <Route path="/publish-notifications" element={<PublishNotifications />} /> */}
                        {/* <Route path="/manage-content" element={<ManageContent />} /> */}
                        {/* <Route path="/statistics" element={<Statistics />} /> */}
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
