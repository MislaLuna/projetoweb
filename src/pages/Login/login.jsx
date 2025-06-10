import React, { useState } from 'react';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email && password) {
            try {
                const response = await fetch(`http://localhost:8080/usuarios/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(password)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const user = await response.json();
                    console.log('Login bem-sucedido:', user);
                    navigate('/home2');
                } else {
                    const error = await response.text();
                    alert(`Erro ao fazer login: ${error}`);
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Erro de conexão. Tente novamente.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <i className="bi bi-envelope" />
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="bi bi-lock" />
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="footer-links">
                        <a href="/contanova"><b>Criar Conta</b></a>
                        <a href="/esqueceusenha"><b>Esqueci minha senha</b></a>
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
            <div className="login-image">
                <img src="src/pages/img/mulher-usando-um-tablet-isolado-na-parede-branca_53419-9802.avif" alt="Imagem de Login" />
            </div>
        </div>
    );
};

export default LoginPage;
