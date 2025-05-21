import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/owl.carousel.min.css';
import '../../css/owl.theme.default.min.css';
import '../../css/login.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    let errorMessage = "";

    const registeredEmails = [
      "teste@email.com",
      "usuario@empresa.com",
      "admin@site.com"
    ];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(username)) {
      errorMessage += "Digite um e-mail válido.\n";
    } else if (!registeredEmails.includes(username)) {
      errorMessage += "Este e-mail não está registrado.\n";
    }

    if (!password) {
      errorMessage += "Preencha o campo Senha.\n";
    }

    if (errorMessage) {
      alert(errorMessage);
    } else {
      alert("Login bem-sucedido!");
      navigate('/pagina5');
    }
  };

  return (
    <div>
      <div className="overlay"></div>
  
      <section className="login-wrapper">
        <div className="login-box">
          <div className="login-left">
            <img src="src/pages/img/ebfe96c85b15693c1ffd6ff8bf906e8f.jpg" alt="Imagem Login" className="login-image" />
          </div>
  
          <div className="login-right">
            <div className="header">
              <Link to="/inicio" className="logo-link">
                <img src="src/pages/img/image.png" alt="Logo" className="logo-image" />
              </Link>
              <h1 className="login-title">LOGIN</h1>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Usuário | Email</label>
                <div className="input-icon">
                  <i className="bi bi-person"></i>
                  <input 
                    type="text" 
                    id="username" 
                    placeholder="Digite seu usuário" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
  
              <div className="input-group">
                <label htmlFor="password">Senha</label>
                <div className="input-icon">
                  <i className="bi bi-lock"></i>
                  <input 
                    type="password" 
                    id="password" 
                    placeholder="Digite sua senha" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
  
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
      </section>
    </div>
  );
};

export default LoginPage;
