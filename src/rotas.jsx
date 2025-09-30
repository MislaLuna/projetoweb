        import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
        import HomePage from './pages/Home/inicio';
        import LoginPage from "./pages/Login/login";
        import RegisterPage from "./pages/CriarConta/contanova";
        import ForgotPasswordPage from "./pages/EsqueceuSenha/esqueceusenha";
        import Home2 from "./pages/Equipe/equipe";
        import GestaoTarefas from "./pages/GestaoTarefas/gestaotarefas";
        import GestaoDepartamentos from "./pages/GestãoDepartamento/gestaodepartamento";
        import Dashboard from "./pages/DashBoard/dashboard";
        import VerifyCodePage from "./pages/VerificarCodigoNovaSenha/verificaCodigo";
        import ResetPasswordPage from "./pages/CriaNovaSenha/crianovasenha";
        import ConfigurationPage from "./pages/Configuracao/configuracao";
        import GestaoEquipes from "./pages/Equipe/equipe";

        

        function RoutesApp() {
            return (    
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/inicio" />} />
                        <Route path="/inicio" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/contanova" element={<RegisterPage />} />
                        <Route path="/esqueceusenha" element={<ForgotPasswordPage />} />
                        <Route path="/verificaCodigo" element={<VerifyCodePage />} />
                        <Route path="/crianovasenha" element={<ResetPasswordPage />} />
                        <Route path="/gestaotarefas" element={<GestaoTarefas />} />
                        <Route path="/gestaodepartamento" element={<GestaoDepartamentos />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/configuracao" element={<ConfigurationPage />} />
                        <Route path="/equipe" element={<GestaoEquipes />} />
                        
                    </Routes>
                </BrowserRouter>
            );
        }

        export default RoutesApp;
