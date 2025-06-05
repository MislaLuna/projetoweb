import React, { useState } from 'react';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/login.css'; 
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            alert('Por favor, preencha seu e-mail.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/recuperar-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro: ${errorData.message || 'Erro ao solicitar recuperação'}`);
                return;
            }

            alert('Se este e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.');
            navigate('/login');
        } catch (error) {
            console.error('Erro ao solicitar recuperação:', error);
            alert('Ocorreu um erro. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Recuperar Senha</h2>
                <p style={{ marginBottom: '15px' }}>Informe seu e-mail cadastrado para receber o link de redefinição de senha.</p>
                <form onSubmit={handleForgotPassword}>
                    <div className="input-group">
                        <i className="bi bi-envelope"></i>
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Enviar Link</button>
                </form>
                <div className="footer-links" style={{ marginTop: '15px' }}>
                    <a href="/login" className="create-account-link">Voltar ao Login</a><br />
                    <a href="/register" className="forgot-password-link">Criar uma Conta</a>
                </div>
            </div>
            <div className="login-image" style={{ flex: 1, maxWidth: '500px', padding: '20px' }}>
                <img
                    src="src/pages/img/Design sem nome (1).png"
                    alt="Imagem Recuperação"
                    style={{ width: '100%', borderRadius: '10px', objectFit: 'cover' }}
                />
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
