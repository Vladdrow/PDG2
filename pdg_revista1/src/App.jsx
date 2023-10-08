import { Routes, Route, useLocation } from 'react-router-dom';
/* Style */
import "./App.css";
/* Pages */
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
    const location = useLocation();
    const currentPath = location.pathname.slice(1); // Elimina el "/" inicial

    return (
        <div className={`App ${currentPath}`}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
