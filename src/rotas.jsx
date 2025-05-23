    import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
    import HomePage from './pages/Home/inicio';
    import LoginPage from "./pages/Login/login";
    import CriarConta from "./pages/CriarConta/contanova";

    function RoutesApp() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/inicio" />} />
                    <Route path="/inicio" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/contanova" element={<CriarConta />}/>
                   
                </Routes>
            </BrowserRouter>
        );
    }

    export default RoutesApp;
