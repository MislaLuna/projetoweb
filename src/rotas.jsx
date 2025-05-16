import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/Home/inicio'; // A HomePage já contém o cabeçalho
import Formulario from './pages/Formulario/formulario';
import LoginPage from "./pages/Login/login";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/inicio" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/formulario" element={<Formulario />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
