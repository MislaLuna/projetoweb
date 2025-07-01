        import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
        import HomePage from './pages/Home/inicio';
        import LoginPage from "./pages/Login/login";
        import RegisterPage from "./pages/CriarConta/contanova";
        import ForgotPasswordPage from "./pages/EsqueceuSenha/esqueceusenha";
        import Home2 from "./pages/Home2/home2";
        import GestaoTarefas from "./pages/GestaoTarefas/gestaotarefas";
        import GestaoDepartamentos from "./pages/GestãoDepartamento/gestaodepartamento";
        

        function RoutesApp() {
            return (    
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/inicio" />} />
                        <Route path="/inicio" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/contanova" element={<RegisterPage />} />
                        <Route path="/esqueceusenha" element={<ForgotPasswordPage />} />
                        <Route path="/home2" element={<Home2 />} />
                        <Route path="/gestaotarefas" element={<GestaoTarefas />} />
                        <Route path="/gestaodepartamento" element={<GestaoDepartamentos />} />
                    </Routes>
                </BrowserRouter>
            );
        }

        export default RoutesApp;
