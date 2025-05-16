import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/owl.carousel.min.css';
import '../../css/owl.theme.default.min.css';
import '../../css/tooplate-gotto-job.css';


const LoginPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Formulário submetido");

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        let errorMessage = "";

        const registeredEmails = ["teste@email.com", "usuario@empresa.com", "admin@site.com"];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(username)) {
            errorMessage += "Digite um e-mail válido (ex: usuario@email.com).\n";
        } else if (!registeredEmails.includes(username)) {
            errorMessage += "Este e-mail não está registrado.\n";
        }

        if (password === "") {
            errorMessage += "Preencha o campo Senha.\n";
        }

        if (errorMessage) {
            alert(errorMessage);
        } else {
            alert("Login bem-sucedido!");
            navigate('/pagina5'); // Altere para a rota correta
        }
    };

    React.useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "YOUR_GOOGLE_CLIENT_ID",
            callback: handleCredentialResponse
        });

        window.google.accounts.id.renderButton(
            document.querySelector(".google-login"),
            { theme: "outline", size: "large" }
        );
    }, []);

    const handleCredentialResponse = (response) => {
        console.log("Google Login Response:", response);
    };

    return (
        <div>
            <div className="overlay"></div>
            <Link to="/inicio" className="logo-link">
                <br />
                <img src="src/pages/img/image.png" alt="Logo" className="logo-image" />
            </Link>

            <section className="about-section">
                <div className="container">
                    <div className="row">
                        <div className="top-container">
                            <div className="top-div">
                                <br />
                                <h1 style={{ color: "#3d0e54d8" }} className="login-title">LOGIN</h1>
                            </div>
                        </div>

                        <div className="login-container">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label htmlFor="username">Usuário | Email</label>
                                    <div className="input-icon">
                                        <i className="material-icons">person</i>
                                        <input type="text" id="username" placeholder="Digite seu usuário" />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="password">Senha</label>
                                    <div className="input-icon">
                                        <i className="material-icons">lock</i>
                                        <input type="password" id="password" placeholder="Digite sua senha" />
                                    </div>
                                </div>

                                <div className="social-login">
                                    <a href="#" className="google-login">
                                        <i className="fab fa-google"></i> Login com Google
                                    </a>
                                </div>

                                <br /><br />
                                <div className="form-actions">
                                    <button type="submit">Entrar</button>
                                </div>
                                <div className="links">
                                    <Link to="/pagina3">Esqueceu a senha?</Link>
                                    <span> | </span>
                                    <Link to="/pagina4">Criar conta</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <script src="https://accounts.google.com/gsi/client" async defer></script>
        </div>
    );
};

export default LoginPage;
