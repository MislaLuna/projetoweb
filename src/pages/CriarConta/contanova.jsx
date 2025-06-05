import React, { useState } from 'react';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/login.css'; // Seu CSS
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (username && password && email) {
            if (password !== confirmPassword) {
                alert('As senhas não coincidem. Tente novamente.');
                return;
            }
            try {
                const response = await fetch('http://localhost:8080/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nome: username,
                        email: email,
                        senha: password,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(`Erro: ${errorData.message || 'Erro ao registrar'}`);
                    return;
                }

                console.log('Usuário registrado com sucesso');
                navigate('/login');
            } catch (error) {
                console.error('Erro ao registrar:', error);
                alert('Ocorreu um erro. Tente novamente mais tarde.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-register" >
                <h2>Criar Conta</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <i className="bi bi-person"></i>
                        <input 
                            type="text" 
                            placeholder="Nome de Usuário" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <i className="bi bi-lock"></i>
                        <input 
                            type="password" 
                            placeholder="Senha" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <i className="bi bi-lock"></i>
                        <input 
                            type="password" 
                            placeholder="Confirme a Senha" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <i className="bi bi-envelope"></i>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Criar Conta</button>
                </form>
                <div className="footer-links" style={{ marginTop: '15px' }}>
                    <a href="/login" className="create-account-link">Já tem uma conta? Faça login</a><br/>
                    <a href="/esqueceusenha" className="forgot-password-link">Esqueceu a senha?</a>
                </div>
            </div>
            <div className="login-image" style={{ flex: 1, maxWidth: '500px', padding: '20px' }}>
                <img 
                    src="src/pages/img/Design sem nome.png" 
                    alt="Imagem Registro" 
                    style={{ width: '100%', borderRadius: '10px', objectFit: 'cover' }}
                />
            </div>
        </div>
    );
};

export default RegisterPage;
