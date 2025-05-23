import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/owl.carousel.min.css';
import '../../css/owl.theme.default.min.css';
import '../../css/login.css';

function CriarConta() {
    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.name.value.trim();
        const email = event.target.email.value.trim();
        const password = event.target.password.value.trim();
        const confirmPassword = event.target.confirmPassword.value.trim();

        if (!name) {
            alert("Por favor, digite seu nome completo.");
            return;
        }

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        alert("Conta criada com sucesso!");
        window.location.href = "/login"; // Altere conforme sua rota
    };

    return (
        <div className="login-wrapper">
            <div className="login-box">

                {/* Lado esquerdo com imagem */}
                <div className="login-left">
                    <img
                        src="src/pages/img/21866ebfe16d551434bacf1af464cc2e.jpg"
                        className="login-image"
                        alt="Imagem criar conta"
                    />
                </div>

                {/* Lado direito com formulário */}
                <div className="login-right">
                    <a href="/login" className="logo-link">
                        <img src="/images/T.jpg" alt="Logo" className="logo-image" />
                    </a>

                    <h2 className="login-title" style={{ color: '#3d0e54d8' }}>CRIAR CONTA</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label htmlFor="name">Nome Completo</label>
                            <div className="input-icon">
                                <i className="material-icons">person</i>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Digite seu nome"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-icon">
                                <i className="material-icons">email</i>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Digite seu email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Senha</label>
                            <div className="input-icon">
                                <i className="material-icons">lock</i>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Digite sua senha"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirmar Senha</label>
                            <div className="input-icon">
                                <i className="material-icons">lock</i>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirme sua senha"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit">Criar Conta</button>
                        </div>

                        <br />

                        

                        <div className="links">
                            <Link to="/login">Já tem uma conta? Faça login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CriarConta;
